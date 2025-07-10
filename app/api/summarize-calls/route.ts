import { NextRequest, NextResponse } from "next/server";
import { mockGongCalls } from '@/lib/mock-calls';
import { generateText, experimental_createMCPClient as createMcpClient, generateObject, NoSuchToolError, CoreMessage } from "ai";
import { openai } from "@ai-sdk/openai";
// import { anthropic } from "@ai-sdk/anthropic";
import mcpConfig from "@/lib/config";
import { systemPrompt } from "@/lib/prompts/summarize-calls";


export const maxDuration = 900;


export async function POST(req: NextRequest) {
  try {
    if (req.method !== "POST") {
      return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
    }

    // Extract user input and auth token from request
    const { input } = await req.json();
    if(!input) {
        return NextResponse.json(
            { error: 'Missing Input' },
            { status: 400 }
        )
    }

    const callData = mockGongCalls[0];

    const messages: CoreMessage[] = [
        {
            role: 'system',
            content: systemPrompt
        },
        {
            role: 'user',
            content: `Process this call data: ${JSON.stringify(callData, null, 2)}`,
        }
    ];
    //create the clients for notion, can use mcp config still

    const notionClient = await createMcpClient(mcpConfig(process.env.SMITHERY_API_KEY || '', process.env.NOTION_API_KEY || ''))
    const notionTools = await notionClient.tools();

    
        
    // don't use gateway and create agent from spinai, use generateText from ai-sdk
    const result = await generateText({
      model: openai('gpt-4.1-mini'),
      maxSteps: 13,
      experimental_continueSteps: true,
      messages,
      tools: { ...notionTools },

      onStepFinish({ text, toolCalls, toolResults, finishReason, usage }) {
        // your own logic, e.g. for saving the chat history or recording usage
        console.log('text ', text);
        console.log('toolCalls ', toolCalls);
        console.log('toolResults ', toolResults);
        console.log('finishReason ', finishReason);
        console.log('usage ', usage);
      },
      experimental_repairToolCall: async ({
        toolCall,
        tools,
        parameterSchema,
        error,
      }) => {
        if (NoSuchToolError.isInstance(error)) {
          return null; // do not attempt to fix invalid tool names
        }
    
        const tool = tools[toolCall.toolName as keyof typeof tools];
    
        const { object: repairedArgs } = await generateObject({
          model: openai('gpt-4o', { structuredOutputs: true }),
          schema: tool.parameters,
          prompt: [
            `The model tried to call the tool "${toolCall.toolName}"` +
              ` with the following arguments:`,
            JSON.stringify(toolCall.args),
            `The tool accepts the following schema:`,
            JSON.stringify(parameterSchema(toolCall)),
            'Please fix the arguments to match the schema exactly.',
          ].join('\n'),
        });
    
        return { ...toolCall, args: JSON.stringify(repairedArgs) };
      },
    });

    notionClient?.close();

    messages.push(...result.response.messages)
    console.log('messages  ', messages);
    return NextResponse.json(
        { totalSteps: result.steps.length },
        { status: 200 }
    )

  } catch (error) {
    console.error("Agent Error:", error);
    console.error("Error details:", {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      name: error instanceof Error ? error.name : undefined
    });
    return NextResponse.json({ error: "Internal Server Error", details: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}