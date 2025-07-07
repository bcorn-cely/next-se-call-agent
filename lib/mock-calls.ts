type GongCall = {
    companyName: string
    participants: string[]
    transcript: string
    title: string
    id: string
    url: string
  }
  
  export const mockGongCalls: GongCall[] = [
    {
      id: "call_001_techcorp_discovery",
      companyName: "TechCorp Solutions",
      title: "TechCorp Discovery Call - Frontend Infrastructure Evaluation",
      url: "https://app.gong.io/call?id=call_001_techcorp_discovery",
      participants: [
        "Sarah Chen (Vercel AE)",
        "Brandon Corn (Vercel SE)",
        "David Kim (TechCorp CTO)",
        "Jennifer Walsh (TechCorp Engineering Manager)",
        "Alex Thompson (TechCorp Senior Frontend Developer)",
      ],
      transcript: `Sarah Chen: Thanks everyone for joining today. I'm Sarah, your Account Executive at Vercel, and I'm joined by Brandon, our Sales Engineer. David, I know you reached out after seeing our Next.js Conf presentation about edge functions.
  
  David Kim: Exactly, thanks Sarah. I'm David, CTO here at TechCorp. We're hitting some serious scaling issues with our current setup. We've got about 15 React applications - mix of Next.js and Create React App - serving around 2.3 million monthly active users.
  
  Brandon Corn: That's substantial scale, David. What's your current deployment architecture looking like?
  
  Jennifer Walsh: I can jump in - I'm Jennifer, Engineering Manager. Right now we're running everything on AWS. We've got S3 + CloudFront for static assets, but our build pipeline is... well, it's a mess. We're using Jenkins with custom Docker containers, and builds are taking anywhere from 12 to 25 minutes depending on the app.
  
  Alex Thompson: And that's when they work. I'm Alex, Senior Frontend Dev. Last week we had three failed deployments in a row because of dependency conflicts in our build environment. Our developers are spending more time debugging deployments than writing code.
  
  Brandon Corn: Ouch. Are you doing any kind of preview or staging deployments currently?
  
  Alex Thompson: Sort of. We have a shared staging environment, but it's... *laughs* it's basically broken half the time. When someone pushes to staging, it overwrites whatever anyone else was testing. We've got 8 frontend developers all trying to use the same staging URL.
  
  David Kim: The business impact is real. Our product team can't iterate quickly because they can't see changes until we do a full staging deployment. And our QA cycle is at least 3 days because of all the coordination required.
  
  Brandon Corn: I'm seeing some patterns here that we help solve regularly. Let me ask about your traffic patterns - are you seeing any geographic distribution issues?
  
  Jennifer Walsh: Actually yes. We're getting complaints from our European users about slow load times. Our CDN is configured, but we're still seeing 3-4 second load times in Germany and the UK.
  
  Sarah Chen: Brandon, that sounds like a perfect fit for our Edge Network.
  
  Brandon Corn: Definitely. David, with Vercel, your builds would typically run under 90 seconds for most Next.js apps, and every single PR gets its own preview URL automatically. No more shared staging environment conflicts.
  
  Alex Thompson: Wait, every PR gets its own URL? How does that work with our backend APIs?
  
  Brandon Corn: Great question. Your preview deployments can still connect to your existing APIs - whether that's staging, production, or even branch-specific API deployments. We see a lot of teams start by pointing previews at their staging APIs, then get more sophisticated over time.
  
  David Kim: What about our Create React App applications? We've got 6 of those that we haven't migrated to Next.js yet.
  
  Brandon Corn: No problem. We can deploy CRA apps as static sites immediately. You get the same preview deployments, same global CDN, same fast builds. Then as you migrate to Next.js, you unlock additional features like API routes and edge functions.
  
  Jennifer Walsh: Speaking of API routes - we currently have about 15 Lambda functions that handle things like user authentication, data fetching, some light processing. Could those move to Vercel?
  
  Brandon Corn: Potentially, yes. Vercel Functions support both Node.js and Edge Runtime. What's the current invocation volume on those Lambdas?
  
  Jennifer Walsh: Let me think... probably around 800K invocations per month across all of them. Most are pretty lightweight - authentication checks, data transformations, that kind of thing.
  
  Brandon Corn: That volume works well with our platform. The nice thing is you can co-locate those functions with your frontend code instead of managing them separately in AWS.
  
  David Kim: Okay, I'm interested, but I need to understand the migration complexity. We can't have any downtime - we're processing about $2M in transactions daily through these applications.
  
  Sarah Chen: Absolutely understood, David. Brandon, can you walk through how we'd approach a zero-downtime migration?
  
  Brandon Corn: Sure. We'd start with one non-critical application - maybe an internal tool or marketing site. Get your team comfortable with the workflow. Then for your main applications, we'd run them in parallel. You'd deploy to both your current setup and Vercel, then gradually shift traffic using your load balancer or DNS.
  
  Alex Thompson: What about our current CI/CD? We've got a lot of custom logic in our Jenkins pipelines - automated testing, security scans, deployment notifications to Slack.
  
  Brandon Corn: You can keep all of that. Vercel integrates with Jenkins through our CLI or API. You can trigger our deployments as part of your existing pipeline, or we can deploy automatically on git pushes and you keep Jenkins for your testing and notifications.
  
  Jennifer Walsh: What's the monitoring story? We use DataDog pretty heavily for APM and logging.
  
  Brandon Corn: We integrate well with DataDog. You'll get our built-in Web Vitals and deployment analytics, plus you can continue sending custom metrics to DataDog. We also have webhook integrations for deployment events.
  
  David Kim: Let's talk numbers. What would this cost for our scale?
  
  Sarah Chen: Based on what you've shared - 15 applications, 8 developers, your traffic volume - you'd likely fit on our Pro plan. That's $20 per seat monthly, so $160 for your team, plus usage-based pricing for bandwidth and function invocations.
  
  Brandon Corn: For your 2.3M monthly users and current traffic patterns, you're probably looking at around $800-1200 total monthly cost.
  
  David Kim: That's... actually less than we're spending on CloudFront and our current build infrastructure. What about support?
  
  Sarah Chen: Pro plan includes email support with 24-hour response time. If you need faster response times or dedicated support, we can discuss our Team plan.
  
  Jennifer Walsh: I'm curious about the edge functions you mentioned. We've been wanting to implement some personalization features - showing different content based on user location and behavior.
  
  Brandon Corn: Perfect use case. Edge functions run at our edge locations worldwide, so you can do that personalization logic close to your users. Much faster than round-tripping to your origin servers.
  
  Alex Thompson: Can we see this in action? Like, actually see how the deployment process works?
  
  Brandon Corn: Absolutely. I can set up a proof of concept this week. We'll take one of your existing applications - maybe start with a Next.js one - and show you the complete workflow. Build times, preview deployments, the whole thing.
  
  David Kim: Which application would make sense for the POC?
  
  Alex Thompson: Our customer support portal might be good. It's Next.js, gets decent traffic, but isn't mission-critical if something goes wrong.
  
  Jennifer Walsh: That works. It's also one where we could really benefit from faster iteration - the support team is always asking for UI changes.
  
  Brandon Corn: Perfect. I can have that set up by Thursday. I'll need access to the repo and about 30 minutes with Alex to walk through the current build process.
  
  Sarah Chen: I'll send over a POC agreement after this call. David, what would you need to see from the POC to move forward?
  
  David Kim: I want to see the build times, the preview deployment workflow, and get feedback from the team on the developer experience. If it's as smooth as you're describing, we'd want to discuss a broader rollout.
  
  Jennifer Walsh: And I'd want to understand the migration process for our more complex applications - the ones with custom webpack configs and build optimizations.
  
  Brandon Corn: Definitely. I'll document the POC process and include recommendations for your other applications. Some of those custom webpack configs might not be necessary with our platform, but we can work through any edge cases.
  
  Alex Thompson: When would we be able to start the POC?
  
  Brandon Corn: I can start setup tomorrow if you can give me repo access. We should have it running by Thursday, then we can do a demo call on Friday to walk through everything.
  
  Sarah Chen: That timeline work for everyone?
  
  David Kim: Perfect. Let's do it. Jennifer, can you coordinate the repo access with Alex?
  
  Jennifer Walsh: Will do. I'm excited to see this in action.
  
  Sarah Chen: Great. I'll follow up with the POC agreement and next steps. Thanks everyone!
  
  Brandon Corn: Looking forward to showing you what we can do. Talk to you all Thursday.`,
    },
    {
      id: "call_002_financeflow_demo",
      companyName: "FinanceFlow Analytics",
      title: "FinanceFlow Technical Demo - Next.js Migration Strategy",
      url: "https://app.gong.io/call?id=call_002_financeflow_demo",
      participants: [
        "Rachel Kim (Vercel AE)",
        "Jordan Martinez (Vercel SE)",
        "Emily Corn (FinanceFlow Head of Engineering)",
        "Tom Bradley (FinanceFlow Lead DevOps Engineer)",
        "Priya Patel (FinanceFlow Product Manager)",
        "Kevin Zhang (FinanceFlow Security Architect)",
      ],
      transcript: `Rachel Kim: Good afternoon everyone. I'm Rachel from Vercel, and I'm here with Jordan, our Sales Engineer. Thanks for taking the time for this technical demo today.
  
  Emily Corn: Thanks Rachel. I'm Emily, Head of Engineering at FinanceFlow. We're really interested in seeing how Vercel could help us modernize our financial analytics platform.
  
  Jordan Martinez: Perfect. Emily, I understand you're currently running a monolithic Rails application and looking to break out your frontend into a modern React stack?
  
  Tom Bradley: That's right. I'm Tom, Lead DevOps. Our current deployment process is painful - we have to coordinate releases between frontend and backend teams, and any frontend change requires a full application deployment.
  
  Priya Patel: From a product perspective, this is slowing down our ability to iterate on user experience. I'm Priya, Product Manager. We want to be able to ship frontend improvements independently.
  
  Jordan Martinez: That's exactly what we help with. Let me share my screen and show you how this would work. *shares screen* Here's a demo Next.js application that mimics a financial dashboard. Notice how we can deploy frontend changes independently while still connecting to your existing Rails API.
  
  Kevin Zhang: I'm Kevin, Security Architect. Before we go too deep, I need to understand the security model. We handle sensitive financial data and need to ensure compliance with SOX and PCI requirements.
  
  Jordan Martinez: Great question, Kevin. Vercel is SOC 2 Type II compliant, and we support enterprise security features like SAML SSO, IP allowlisting, and we can deploy in regions that meet your data residency requirements. Are you currently using any specific compliance frameworks?
  
  Kevin Zhang: Yes, we need to ensure all data stays within US borders, and we have strict access controls.
  
  Jordan Martinez: Perfect. We can configure your deployments to only use US-based edge locations, and our Enterprise plan includes advanced access controls and audit logging.
  
  Emily Corn: What about our existing CI/CD pipeline? We use Jenkins and have a lot of custom deployment scripts.
  
  Jordan Martinez: You can keep your existing Jenkins setup. Vercel integrates via webhooks or our CLI. You can trigger deployments from Jenkins, or we can deploy automatically on git pushes. Tom, what's your current deployment frequency?
  
  Tom Bradley: We deploy about twice a week currently, but we'd love to deploy daily or even multiple times per day for frontend changes.
  
  Jordan Martinez: With Vercel, you could deploy every commit if you wanted. Each PR gets its own preview URL, so Priya, your team could review changes in a live environment before merging.
  
  Priya Patel: That would be amazing. Currently, we have to wait for staging deployments to see frontend changes, and staging is often broken or out of sync.
  
  Jordan Martinez: Let me show you preview deployments in action. *demonstrates* Here's a PR with a dashboard change. Notice how it gets its own URL instantly, and it's connected to your production API but isolated for testing.
  
  Emily Corn: This looks great for our public-facing dashboard, but we also have internal admin tools. Can those be deployed on Vercel too?
  
  Jordan Martinez: Absolutely. You can have multiple projects - one for your customer dashboard, one for admin tools. The admin tools can be protected with authentication and IP restrictions.
  
  Rachel Kim: Emily, based on what we've discussed, what timeline are you thinking for a migration like this?
  
  Emily Corn: We'd probably want to start with our customer dashboard first, then move the admin tools. Maybe a 3-4 month timeline?
  
  Tom Bradley: What about our current CDN setup? We're using CloudFlare currently.
  
  Jordan Martinez: You can keep CloudFlare if you want, but Vercel includes a global CDN with automatic optimization. Most customers find our CDN performs better and simplifies their stack.
  
  Kevin Zhang: What about monitoring and alerting? We need detailed logs and performance metrics.
  
  Jordan Martinez: We provide built-in analytics and Web Vitals monitoring. You can also integrate with your existing tools like DataDog or New Relic. We have webhooks for deployment events and errors.
  
  Priya Patel: What would the user experience be during migration? We can't have any downtime.
  
  Jordan Martinez: Zero downtime. You'd run both systems in parallel, gradually migrate routes using your load balancer or DNS, then sunset the old frontend once everything's moved over.
  
  Rachel Kim: From a cost perspective, for your scale - about 50 developers and the traffic volume you mentioned - you'd be looking at our Pro plan, roughly $2,000-3,000 monthly.
  
  Emily Corn: That's reasonable. What are the next steps?
  
  Rachel Kim: I'd love to set up a proof of concept. Jordan can help you migrate one component of your dashboard to show the full workflow.
  
  Jordan Martinez: I can have a POC environment ready by Friday. We'll use your actual API and show the complete deployment pipeline.
  
  Emily Corn: Perfect. Let's do it.
  
  Kevin Zhang: Can we also schedule a security deep-dive call?
  
  Rachel Kim: Absolutely. I'll coordinate with our security team for next week.
  
  Tom Bradley: And I'd like to understand the monitoring integration better.
  
  Jordan Martinez: I'll include that in the POC setup. Thanks everyone!`,
    },
    {
      id: "call_003_techcorp_followup",
      companyName: "TechCorp Solutions",
      title: "TechCorp POC Results Review & Next Steps Discussion",
      url: "https://app.gong.io/call?id=call_003_techcorp_followup",
      participants: [
        "Sarah Chen (Vercel AE)",
        "Brandon Corn (Vercel SE)",
        "David Kim (TechCorp CTO)",
        "Jennifer Walsh (TechCorp Engineering Manager)",
        "Alex Thompson (TechCorp Senior Frontend Developer)",
        "Rachel Martinez (TechCorp VP of Product)",
      ],
      transcript: `Sarah Chen: Thanks everyone for joining our POC review call. It's been exactly one week since we deployed your customer support portal to Vercel. Alex, how did it go?
  
  Alex Thompson: Brandon, I have to say - I was skeptical about the 90-second build times you promised, but we're actually averaging 73 seconds. Our Jenkins builds for the same app were taking 18-22 minutes.
  
  Brandon Corn: That's fantastic, Alex. I saw in our dashboard you've done 23 deployments this week, which is more than you typically do in a month for that application.
  
  Jennifer Walsh: The development team is blown away. Sarah, remember how I mentioned our shared staging environment issues? We had three developers working on different features simultaneously this week, each with their own preview URL. No conflicts, no waiting.
  
  David Kim: The metrics are impressive. Rachel, can you share what you're seeing from the product side?
  
  Rachel Martinez: Hi everyone - I'm Rachel, VP of Product. I joined because the results have been remarkable. The support portal's Core Web Vitals improved dramatically. Our Largest Contentful Paint went from 4.2 seconds to 1.3 seconds.
  
  Brandon Corn: That's a huge improvement, Rachel. Are you seeing any business impact from those performance gains?
  
  Rachel Martinez: Actually, yes. Our support ticket resolution time decreased by 15% this week. The support team says the portal feels much more responsive, so they're navigating faster between tickets and customer records.
  
  Sarah Chen: That's exactly the kind of impact we love to hear about. David, I know you were concerned about the migration complexity. How did that feel?
  
  David Kim: Honestly, much smoother than expected. Alex, how long did the actual migration take?
  
  Alex Thompson: Brandon and I spent about 2 hours on Thursday setting it up. Most of that was me explaining our current build process and custom webpack config. Turns out we didn't need half of our custom optimizations - Vercel handles a lot of that automatically.
  
  Brandon Corn: Yeah, your bundle splitting and image optimization configs weren't necessary. Our platform does that out of the box, plus some additional optimizations you weren't getting before.
  
  Jennifer Walsh: The preview deployment workflow has been a game changer. Our QA process used to take 2-3 days because we had to coordinate staging deployments. This week, QA was reviewing features within minutes of the PR being opened.
  
  Rachel Martinez: From a product perspective, this is huge. We've been wanting to do more rapid experimentation and A/B testing, but our old deployment process made it too risky and slow.
  
  Sarah Chen: Rachel, that's interesting. Are you thinking about using Vercel for more than just the support portal?
  
  Rachel Martinez: Definitely. We have our main customer dashboard that gets about 80% of our traffic. If we could get similar performance improvements there, it could significantly impact our conversion rates.
  
  David Kim: That's actually what I wanted to discuss. Brandon, in our first call, you mentioned we could migrate all 15 applications. Based on this POC success, what would that roadmap look like?
  
  Brandon Corn: Great question. I'd recommend prioritizing by business impact and technical complexity. Your customer dashboard should be next - it's Next.js, high traffic, and you'd see immediate business benefits from the performance improvements.
  
  Jennifer Walsh: What about our more complex applications? We have a few with custom webpack configs, server-side rendering requirements, and some that integrate with our authentication system.
  
  Brandon Corn: Let's talk through those. For SSR, Vercel handles that natively with Next.js. For authentication, are you using something like Auth0 or a custom solution?
  
  Alex Thompson: We're using Auth0 for most apps, but we have a few legacy ones using our own JWT implementation.
  
  Brandon Corn: Perfect. Auth0 integrates seamlessly with Vercel. For the custom JWT apps, we can handle that with middleware or API routes. Not a blocker at all.
  
  David Kim: What about our Create React App applications? You mentioned those in our first call.
  
  Brandon Corn: Right, you have 6 CRA apps. Those can deploy as static sites immediately - same fast builds, same preview deployments. Then you can migrate them to Next.js over time to unlock additional features.
  
  Rachel Martinez: Speaking of additional features, you mentioned edge functions for personalization. We've been wanting to show different dashboard layouts based on user roles and geographic location.
  
  Brandon Corn: That's a perfect use case for edge functions. Instead of doing that logic server-side and adding latency, you can run it at the edge. We typically see 40-60% latency improvements for personalization use cases.
  
  Sarah Chen: David, it sounds like you're ready to discuss a broader rollout. What would you need from us to move forward?
  
  David Kim: I need a detailed migration plan with timelines, a pricing proposal for all 15 applications, and buy-in from the broader engineering team.
  
  Brandon Corn: I can create a phased migration roadmap. Based on your team capacity and the complexity of each app, I'm thinking 3-4 applications per month over 4-5 months.
  
  Jennifer Walsh: That seems reasonable. We'd want to start with our highest-impact, lowest-risk applications first.
  
  Alex Thompson: The customer dashboard should definitely be next. It's our most important application, and if we get the same performance improvements we saw with the support portal...
  
  Rachel Martinez: It could be transformative for our business. That application drives about 60% of our revenue.
  
  Sarah Chen: For pricing, with 15 applications and your team of 8 developers, plus the traffic volume we discussed, you'd be looking at our Team plan - roughly $2,800-3,200 monthly.
  
  David Kim: That's very reasonable, especially considering we're spending about $1,800 monthly on our current AWS setup, plus all the engineering time we're wasting on deployment issues.
  
  Jennifer Walsh: What about support during the migration? This is critical infrastructure for us.
  
  Sarah Chen: The Team plan includes priority support with guaranteed response times. Brandon would continue as your dedicated technical contact throughout the migration.
  
  Brandon Corn: I'd also recommend doing training sessions for your broader engineering team as we onboard each new application.
  
  Alex Thompson: When could we start the next migration?
  
  Brandon Corn: I can have the customer dashboard migration plan ready by early next week. We could start as soon as you're comfortable.
  
  David Kim: Rachel, are you comfortable with migrating the customer dashboard next?
  
  Rachel Martinez: Absolutely. Based on what we've seen with the support portal, I'm confident this will improve our user experience significantly.
  
  Sarah Chen: Perfect. I'll send over the Team plan proposal today, and Brandon will get started on the migration roadmap.
  
  Jennifer Walsh: One more question - what happens to our current AWS infrastructure as we migrate applications?
  
  Brandon Corn: You can decommission it gradually as each application moves over. Most customers see significant cost savings by the end of the migration.
  
  David Kim: Excellent. Let's move forward. This has been one of the smoothest vendor evaluations we've done.
  
  Alex Thompson: Agreed. Thanks Brandon for all the hands-on help this week.
  
  Brandon Corn: My pleasure. Looking forward to migrating the customer dashboard next!
  
  Sarah Chen: Thanks everyone. I'll follow up with the proposal and next steps today.`,
    },
  ]
  