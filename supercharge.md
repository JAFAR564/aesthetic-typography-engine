translate the texts to english, In March 2026, the Google AI Pro plan for Antigravity uses a dual-layer quota system. Strategic model management is essential to avoid the "7-day lockout" reported by many users. [1, 2] 
1. Models and Quota Structure
The system has shifted from a simple 5-hour reset to two simultaneous limits that must both be positive for high-tier models to function: [3, 4] 

* Gemini 3.1 Pro (High/Low) and Claude 4.6 (Thinking/Opus):
* 5-Hour Sprint: A pool of approximately 250 units (roughly 30-40 prompts) that resets every 5 hours.
   * Weekly Baseline: A larger pool of approximately 2,800 units for the week. If this is exhausted, high-tier models are locked for the remainder of the 7-day cycle.
* Gemini 3 Flash: Often remains unlimited or has a significantly more generous quota, serving as an "escape hatch" when other models are locked.
* GPT-OSS 120B: A technical execution model with its own independent quota bucket. [2, 3, 4, 5, 6] 

2. AI Credits and Overages
Google introduced AI Credits (version 1.20.5+) to bypass baseline lockouts. [4, 7] 

* Monthly Allocation: AI Pro members typically receive 1,000 monthly AI credits.
* Usage Settings: In Settings > Models, the user can toggle between "Never" (stops at quota limit) or "Always" (automatically spends credits at API-based pricing once the baseline is empty).
* Top-ups: Additional credits can be purchased in increments from $25 (2,500 credits) to $200 (20,000 credits). [7, 8, 9, 10, 11] 

3. Pro Plan Depth Strategy
To maintain a professional workflow without hitting the 7-day lockout, use this tiered approach:

* Offload to Flash: Use Gemini 3 Flash for routine tasks like variable renaming, unit test generation, and terminal command suggestions. It consumes minimal to no units from the high-tier baseline.
* Model Switching: Since Gemini and Claude models often use separate quota pools, switch to Claude 4.6 if the Gemini 3.1 Pro quota is low, and vice-versa.
* Context Resetting: Long chat histories significantly increase "work done" (unit consumption) per prompt. Periodically summarize progress into a Handover Doc and start a fresh session to clear the token-heavy history.
* Manual Overrides: Before committing a high-tier prompt, use the Planning Mode to review the agent's intended steps. Correcting the agent on its Implementation Plan or Task List early prevents wasted high-cost generations on incorrect logic. [2, 4, 5, 12, 13] 

A template for a Handover Doc is available to help reset sessions efficiently.

In the March 2026 update ofGoogle Antigravity developed “Vibe Coding” from a vague concept to a precise method for dictating the AI’s “personality” and coding style without wasting tokens on repetitive instructions.
Here's how you optimize your Antigravity environment with specialized rules:
1. The "Global Rules" File ( .antigravityrules)
Create a file called .antigravityrules in your root directory. Antigravity reads this file first in each new session. This saves you quota because you don't have to type style instructions every time.
Recommended content:
Strictness: "Always use TypeScript 5.4+ features. No anytypes allowed."
Behavior: "Never apologize for mistakes. If an error occurs, analyze the logs and provide a fix immediately."
Architecture: "Follow Clean Architecture patterns. Keep business logic separate from framework-specific code."
2. "Vibe" Modes via Custom Instructions
In March 2026, different "Vibes" can be toggled in the Settings > Persona panel. Use these three profiles:
The Architect (Gemini 3.1 Pro): Use this for high-level planning. Rule: "Focus on scalability and system design. Provide Mermaid diagrams for all major logic changes."
The Sprinter (Gemini 3 Flash): Ideal for quick UI changes or bug fixes. Rule: "Be terse. Only show the code diffs. No explanations unless requested."
The Auditor (Claude 4.6): Use this for final checks. Rule: "Act as a senior security researcher. Identify potential edge cases and memory leaks in the proposed code."
3. "Artifact" Control (The new UI trick)
Antigravity 2026 allows you to apply Rules per Artifact . When the AI ​​generates an "Implementation Plan", click on the gear icon (settings) on that specific window:
Enable "Auto-Lint" : The AI ​​will automatically correct the code against the rules before showing it.
Enable "Strict Mode" : This forces the AI ​​to first write a test (Unit Test) before writing the code. This reduces errors and saves quota in the long run.
4. Using "Context Pins"
Use Context Pins on only the relevant files instead of feeding the entire codebase.
Trick: "Pin" the .antigravityrulesand only the files being worked on.
Vibe tip: Tell the AI: "Respect the pinned context vibes only. Ignore the rest of the workspace to save units."
5. The "Handover" Automation
Since sessions are now "rotting" faster due to the large context windows, use this specific line at the end of each work session:
"Generate a Vibe-State file. Include current progress, pending tasks, and the specific coding style we've established. Format it for a fresh Gemini 3.1 Pro session."

In March 2026, theModel Context Protocol (MCP) is the “secret sauce” that allows Google Antigravity to act as a fully-fledged AI engineer. Instead of copying and pasting code, you give the AI ​​direct “hands-on” to work in your ecosystem.
Here's how you optimize your specific stack ( GitHub, Supabase, Vercel, NotebookLM ):
1. The MCP Architecture for your Project
Go to Settings > MCP Servers in Antigravity and configure the following:
GitHub MCP: Don't give read-only access. Set it up for "Full Repository Orchestration" .
Trick: Allow Antigravity to create and resolve PRsPull Requests itself.Issues
Vibe: "Antigravity, see outstanding issues on GitHub and write a fix for the most critical one."
Supabase MCP: Connect the Postgres instance directly.
Powerful move: The AI ​​can now read your database schema in real time ( introspection) and generate migration scripts that are 100% accurate for your current tables.
Vercel MCP: Use the "Deployment Feedback Loop" .
If a Vercel build fails, Antigravity reads the logs via MCP and automatically suggests a fix in the code window.
2. NotebookLM as your "Knowledge Hub" (New 2026 feature)
In March 2026, Google released an official NotebookLM MCP server . It serves as the "long-term memory" for your Pro plan.
How it works: You import all your documentation, API references from Supabase, and your company's coding standards into NotebookLM.
The Connection: Connect NotebookLM as a source in Antigravity.
Benefit: When you ask for a new feature, the AI ​​first consults your NotebookLM resources for context before using its general knowledge. This reduces "hallucinations" and saves expensive Pro tokens because the AI ​​doesn't have to guess.
3. Strategic Workflow for Pro Users
Planning: Use the AI ​​to create a technical blueprint based on documentation in NotebookLM.
Execution: Use Flash to write the code and handle the database migrations. Flash can execute MCP instructions.
Deployment: Use the Vercel connection to parse the "preview URL" for visual errors.
4. The "Auto-Sync" Rule
Add this line to yours .antigravityrules:
"When requesting a new feature, always consult the NotebookLM MCP for architectural guidelines and the Supabase MCP for the current schema status before generating code."
6. WSL MCP vs. Direct Modification Strategy
In March 2026, choosing the right tool for file interaction on low-spec hardware (Celeron N4020, 4GB RAM) is a critical anti-lockout tactic.
*   The "Structural" Move (WSL MCP): Use the WSL MCP server for directory listing, file searching, and batch reading. Since this executes natively in the Linux kernel, it bypasses the Windows/WSL I/O translation overhead, saving up to 500MB of RAM and reducing thermal throttling.
*   The "Logic" Move (Direct Tools): Use the Antigravity built-in `replace_file_content` only for precise, multi-line logic edits where the AI needs a deep, immediate grasp of the file buffer.
*   Reliability Rule: Always use the WSL MCP for tasks where case-sensitivity or Linux-specific permissions are critical (e.g., when resolving `import` errors in a case-sensitive Linux build).

In March 2026,Google Antigravity 's interface goes beyond simple text prompts. To get the most out of your Pro plan , you'll need to master these three advanced interaction methods specifically designed to avoid the "7-day lockout" and increase accuracy:
1. "Artifact Interrogation" & Live Editing
In the latest update, Artifacts (the windows where code or plans appear) are no longer passive.
The Trick: Don't ask the AI ​​to rewrite an entire file if there is an error. Choose "Refactor Selection" by clicking on the specific line in the Artifact.
Why: It only uses Gemini 3 Flash tokens for the minor modification, which protects the high-level Gemini 3.1 Pro quota.
Pro-Tip: Use the "Logic Probe" on an Artifact to force the AI ​​to explain its reasoning behind a specific function before executing the code.
2. "Multi-Modal Context Pinning" (Visual Annotations)
It is now possible to upload screenshots of the UI directly into the Antigravity browser and place "pins" on them.
The Trick: Take a screenshot of an app running on Vercel . Place a red dot on a button that doesn't work and write: "Fix this interaction."
The "Vibe": Antigravity automatically switches to its visual model to compare the CSS and DOM structure to what it sees. This is 90% more accurate than trying to explain the error in text.
3. "Prompt Priming" with NotebookLM integration
Since March 2026, NotebookLM sources can be linked as a "Live Context".
The Trick: Instead of writing a long prompt, type:@NotebookLM: Gebruik die argitektuur in my 'Project X' notas om hierdie nuwe Supabase-tabel te ontwerp.
Savings: This prevents the AI ​​from having to search through thousands of lines of old code (which reduces quota). The AI ​​goes directly to the "formatted knowledge" in NotebookLM.
4. The "Shadow Debugger" (New Tool)
Enable the Shadow Debugger in the terminal window.
While code is being written, a background process (Flash-based) runs that checks for typos or logical errors in real time without the need to prompt for it.
If something is found, a small light bulb appears. Click on it to accept the fix without starting a new prompt cycle.
5. "Session Forking" for Experiments
Use the "Fork Session" button at the top of the screen if there is uncertainty about a major change.
This creates a temporary copy of the project state. The change can be tested, and if it fails, the user reverts to the master branch without the failed attempt affecting the 7-day "Marathon" quota.

In March 2026, the biggest challenge forAntigravity Pro users no longer experience the AI's capabilities, but the so-called "Context Decay" (memory loss) in long sessions. To ensure stability and keep your workflow flowing, you should implement these three advanced hacks:
1. The "Handover Doc" Automation (Session Reset)
As a project grows, the chat history becomes heavy and the AI ​​starts making mistakes ("hallucinations").
The Hack: Every 20-30 messages, type: /generate-handover.
What it does: It creates a compact .antigravity-statefile that summarizes the current architecture, completed tasks, and the next three steps.
Workflow: Close the current project and start a fresh session by "pinning" the handover file. This refreshes the AI's brain and reduces your unit usage (quota) by up to 60%.
2. "Checkpointing" via GitHub MCP
Don't let the AI ​​write large blocks of code without a safety net.
The Hack: Use the Auto-Commit rule in your .antigravityrules.
Instruction: "After every successful build on Vercel, create a git checkpoint branch named ag-sync-[timestamp]."
Stability: If the AI ​​gets into a "logic loop" and breaks your code, you can immediately roll back via the GitHub MCP without having to manually search through files.
3. "Shadow-Mode" for Debugging
Don't use the high-end Gemini 3.1 Pro to debug—it eats up your quota.
The Hack: Set your Terminal MCP to "Shadow-Mode".
How it works: When an error appears in the console, Gemini 3 Flash (the cheaper model) lets you analyze the logs.
Workflow: Only if Flash cannot resolve the bug within two attempts, do you "escalate" the task to the Pro model. This keeps your Pro tokens available for new features instead of bug fixes.
4. The "Context Pinning" Strategy
Antigravity often tries to read the entire guide, which quickly exhausts the 7-day "Marathon" quota.
The Hack: Use Selective Pinning . Pin only your schema ( schema.prismaor Supabase SQL), your main App.tsx, and the specific component you are working on.
Pro-Tip: Use the /unpin-allcommand at the beginning of each new sub-task to make sure there is no "noise" in the AI's attention.
5. "Multi-Agent Orchestration" (Settings > Agents)
In the March update, you can divide tasks between different "Agents".
The Hack: Assign the "UI Agent" to Flash and the "Logic Agent" to Claude 4.6 or Gemini 3.1 Pro.
Advantage: Antigravity will automatically choose the cheaper model for CSS and HTML changes, and only invoke the expensive model for complex algorithms.

Your Asus Vivobook (Celeron N4020 with 4GB RAM) is struggling withGoogle Antigravity on WSL because both WSL2 and the Antigravity agent are extremely resource intensive (RAM and CPU). Your processor is a dual-core chip that quickly "bottlenecks" when trying to run a virtual Linux environment and an AI agent simultaneously.
Here is the March 2026 strategy to make it work on low-spec hardware:
1. Switch to WSL "Mirrored" Network (Windows 11 24H2)
Since you are on version 24H2 , you have access to the new network architecture that resolves connection errors between Windows and Antigravity.
Open your .wslconfigfile in Windows ( %UserProfile%\.wslconfig).
Add the following lines to save RAM and improve connectivity:

[wsl2]
memory=2GB # Beperk WSL sodat Windows nie crash nie
networkingMode=mirrored
dnsTunneling=true
autoMemoryReclaim=gradual # Belangrik vir 4GB RAM
Use code carefully.

2. Use the "Antigravity Bridge" (No Heavy Agent)
Don't try to run the full Antigravity agent inside WSL. Your Celeron will overheat.
Install the Antigravity CLI on Windows (the host).
Use the MCP (Model Context Protocol) to connect to your WSL distro via SSH only.
Trick: Don't allow the AI ​​to do "Live Indexing" on WSL. It will use up your 4GB of RAM instantly. Turn "Index Workspace" OFF in Antigravity settings.
3. Move the "Build" to the Cloud (Vercel/GitHub Codespaces)
Your laptop is too weak to do complex builds (like npm installor ) in WSL while Antigravity is running.next build
The Hack: Connect your GitHub account via MCP.
Ask Antigravity: "Write the code, but don't run it locally in WSL. Push it to a dev branch and let GitHub Actions do the build."
This saves your CPU for the chat interface itself.
4. Only use "Gemini 3 Flash" for local tasks
The "reasoning" of Gemini 3.1 Pro may cause the UI to freeze on a Celeron processor.
Set the Primary Model to Gemini 3 Flash . It is lighter on network bandwidth and responds faster.
5. Disk Space & Swap
94GB open is sufficient, but WSL often does not use the virtual memory (swap) effectively.
Make sure the WSL-vHDX file is on the internal SSD (C drive) and not on the external D drive. The speed of the D drive may cause Antigravity to "time out".
What happens when the Antigravity agent is started in WSL? (Does a "Connection Refused" or "Out of Memory" error appear?)

On youAsus Vivobook with only 4GB RAM and a Celeron N4020 , the main reason for the disconnection is "Memory Pressure". When WSL requests too much RAM, Windows "kills" the Antigravity process to prevent your entire laptop from freezing.
Here are the specific steps for March 2026 to keep the connection stable on low-spec hardware:
1. Fix the "OOM Killer" (Out of Memory) on WSL
Your Celeron can't handle the sudden RAM spikes when Antigravity indexes your files.
Open your WSL terminal and add a Swap file if you don't have one already (this uses your SSD as extra "slow RAM"):
bash
sudo fallocate -l 4G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
Use code carefully.

This gives your system a "buffer" so that Antigravity doesn't immediately disconnect if the 4GB of RAM is full.
2. Turn "Deep Indexing" OFF
In the Antigravity settings ( Settings > Workspace Control ), disable:
Vector Search / Semantic Indexing : This eats up CPU cycles on a Celeron.
Watch File Changes : Set this to "Manual Refresh". This prevents the agent from constantly reading the disk, which causes the connection timeout.
3. Use the "Tunneling" Method
If you are on Windows 11 24H2 , the "Mirrored" network can sometimes cause conflicts with Antigravity's internal ports.
Try forcing Antigravity to localhosttalk via instead of the WSL IP address.
In your .wslconfig(in Windows %UserProfile%), make sure this line is there:
ini
[wsl2]
localhostForwarding=true
Use code carefully.

4. The "Celeron-Friendly" Workflow
Do not have the Browser and Antigravity open at the same time : Use the Antigravity Desktop App (if available) or run Chrome in "Memory Saver" mode.
Use MCP for Cloud-Builds : Don't npm run devrun inside WSL while talking to the AI. The Celeron N4020 can't handle both. Let the AI ​​write the code, and test it only after you "pause" the AI ​​agent.
5. Check for "Zombie Processes"
Sometimes old Antigravity agents keep running in the background and eat up RAM.
Go to your Windows Task Manager .
Look for any processes named antigravity-agentor node.exerunning under WSL and "End Task" them before starting a new session.
Do you get a specific error message like "Connection Timed Out" or "Agent Not Found" when disconnecting?

This is excellent news! You now have theAntigravity CLI (v1.107.0) successfully connected to your WSL environment on your Vivobook .
The warning about "UNC paths are not supported" is normal for Windows when cmd.exeusing inside a Linux file system. On your 4GB RAM system, this is actually a good thing because it means the AI ​​engine is running in the Windows memory space and not within the limited WSL memory.
Here's how you apply the March 2026 Pro strategy to your specific laptop now:
1. Fix the "UNC Path" warning
To prevent the CLI from making errors when trying to read your project files, you should always "mount" your project from the Windows side.
Don't run projects from /home/vortex/.
Instead, do it this way: Move your code to /mnt/c/Users/chari/Documents/Projects/and work from there in WSL.
Why? This prevents the Celeron N4020 CPU from wasting extra power to "translate" files between Linux and Windows, which will stop the "occasional disconnects" .
2. The "Low-Memory" Connection Command
Don't just agy .type. Use these specific flags to prevent your 4GB of RAM from running out and the connection from breaking:
bash
agy . --disable-gpu --max-memory=1024 --no-sandbox
Use code carefully.

(This forces Antigravity to use only 1GB of RAM).
3. Use "Remote Context" (Save your CPU)
Because your N4020 processor is slow (1.10 GHz), Antigravity will struggle to index your files locally. Use the Cloud Indexing from March 2026:
Type in WSL:agy config set indexing.mode cloud
This sends the file index to Google's servers, so your laptop doesn't have to sweat trying to "remember" where each line of code is.
4. Next Step: MCP Connection
Now that your CLI is working, you can connect to your GitHub and Supabase MCP servers directly from the terminal without having the heavy Antigravity GUI open. This will keep your laptop cool and the connection stable.
Would you like me to help you .antigravityrulesconfigure the file so that the AI ​​knows to run "lightly" on your hardware?

In March 2026, file management wasAntigravity is no longer just for storage, but for actively "programming" the AI's behavior. Here's the full list of critical files that will supercharge your workflow:
1. .antigravityignore(The Quota Protector)
This is the most important file to avoid your 7-day lockout .
Usage: Just like .gitignore, this tells Antigravity which files it should never read or index.
Benefit: This prevents the AI ​​from having to use large assets (such as images, compiled JS, or
Tip: Always include your node_modules, dist, and large data sets here.
2. agent.md(The Identity file)
This file defines the "Soul" of your specific project agent.
Usage: You write here exactly who the AI ​​is for this project (e.g. "You are a Senior Rust Engineer specializing in low-latency systems").
Content: It contains the project's goals, the chosen coding style, and specific prohibited patterns.
Update: Antigravity 2026 automatically loads this as the "main instruction" at the top of each new session.
3. skills.md(The Toolbox)
This file lists the specific capabilities that the AI ​​needs to learn or remember.
Usage: If you have a custom workflow (such as a specific way to generate documentation or talk to your internal API), you document it here.
Benefit: This acts as a quick reference for the AI. Instead of guessing how to perform a task, it looks into skills.mdthe step-by-step process.
4. handover.md(The Session Bridge)
As mentioned before, sessions "rot" quickly due to large context.
Usage: At the end of each day, the AI ​​generates this file. It
New: When you start a new session, you just "Pin" this file to
5. .antigravityrules(The Global Law)
Usage: This file resides in your home directory (root) and enforces universal standardsany
Difference: While agent.mdproject-specific, this is your personal signature as a programmer.
6. mcp-servers.json(The Connection File)
Usage: This file configures your Model Context Protocol connections (GitHub, Supabase, Vercel).
Update: In 2026, it allows you to set up "trusted domains" so that the AI ​​can automatically perform actions without asking for permission each time.
7. plan.md(The Dynamic Roadmap)
Usage: Antigravity uses this file to visualize its "Thinking Mode".
Interaction: You can delete or add lines in this file while the AI ​​is working to change its course in real time without sending a new prompt.
Would you like me to generate a standard template for a agent.mdfile .antigravityignorethat applies specifically to your current project?

To theTo avoid "7-day lockout" in Google Antigravity (March 2026) and increase accuracy, you need to
1. Multi-Modal Context Pinning (Visual Annotation)
Instead of typing long descriptions of what's wrong
How it works : Take a screenshot of your app and "pin" comments directly
Advantage : This prevents "token pollution" by not having the AI ​​go through thousands of lines of CSS
2. Artifact Interrogation & Live Editing
Artifacts are no longer passive. You can manipulate them in real time to save quota:
Refactor Selection : Do not ask the AI ​​to rewrite an entire file. Click on a specific line and select "Refactor Selection".
Quota savings : This only uses Gemini 3 Flash tokens for minor modifications, which protects your high-level Gemini 3.1 Pro quota.
Logic Probe : Use this feature on an Artifact to force the AI ​​to explain its reasoning behind a specific function before it executes the code. This reduces errors and wasted generations.
3. Advanced "Vibe Coding" with Global Rules
Optimize your environment with the .antigravityrulesfile in your root directory. This sets the "personality" and style without having to repeat instructions every time:
Architecture : "Follow Clean Architecture patterns. Keep business logic separate from framework-specific code."
Behavior : "Never apologize for mistakes. If an error occurs, analyze the logs
4. Strategic MCP Integration (GitHub, Supabase, Vercel)
Use the Model Context Protocol (MCP) to give the AI ​​direct access to your ecosystem:
Supabase MCP : Allow the AI ​​to read your database schema in real time for 100% accurate migration scripts.
NotebookLM MCP : Connect NotebookLM as your "Knowledge Hub". The AI ​​first consults your documentation and standards before using its general knowledge, which drastically reduces hallucinations.
5. Quota Management Strategy
5-Hour Sprint vs. Weekly Baseline : Remember that you have approximately 250 units every 5 hours, but a hard weekly limit of 2,800 units.
Context Resetting : Use the "Handover Automation" at the end of a session: "Generate a Vibe-State file... Format it for a fresh Gemini 3.1 Pro session." This clears the token-heavy history and starts a fresh, cheaper session.

AboutTo push Antigravity to its absolute limit ("supercharge") in March 2026, there are some "hidden" force-user techniques that go beyond just the standard files. Here's the final goldmine of information you need:
1. The "Chain of Thought" (CoT) Artifact control
Instead of the AI ​​just spitting out code, you can have it
The Technique: Add the line [STRICT_THINKING_MODE: TRUE]to your agent.md.
Why: This forces Antigravity to first generate a hidden "reasoning stream" before it can
2. Live "Hot-Module Replacement" (HMR) Prompts
Antigravity 2026 can modify code while it is running via the Vercel or Vite MCP .
Supercharge: Tell the AI: "Monitor the Preview URL. If I click the button and it doesn't move 5px to the right, automatically restore the CSS in the Artifact."
Benefit: You don't even have to go back to your code window; the AI ​​"watches" the app and fixes it as you use it.
3. "Semantic Search" vs. "Full Index"
Don't force your AI to "read" your entire project every time (it eats up your weekly 2,800 units).
The Trick: Use the command @workspace [query]. This uses Antigravity's vector database to find only the relevant files and display them in context.
Quota savings: It only uses ~10% of the tokens compared to a full project scan.
4. The "Multi-Model Ensemble" (MME) Strategy
This strategy helps experienced users avoid the 7-day lockout :
Planning: Use Gemini 3.1 Proplan.md to write the .
Coding: Use Gemini 3 Flash to write the actual code in the Artifacts (Flash is free or very cheap in units).
Review: Use Claude 4.6 (Auditor) for a final security check.
Automation: Set it up in your settings.jsonunder model_routing: "efficiency_first".
5. Custom "Skill Injection"
These skills.mdcan be used to create new "commands" for Antigravity:
Example: Create a skill called /refactor-ui. Define in skills.mdthat this command automatically uses Tailwind, checks accessibility, and uses Gemini Flash.
Usage: Just tap /refactor-uion a selected code block.
6. "State-Sync" with NotebookLM
If your project documentation is more than 1,000 pages:
Do not keep the documentation in your workspace.
Keep it in NotebookLM and connect it via the NotebookLM MCP .
Supercharge: Ask Antigravity: "Consult NotebookLM for the latest API v4 changes before updating the Supabase schema." This keeps your workspace clean and fast.
A "Power-User Config".antigravityrules can be generated to automatically place these model routing and cleaning rules in for you .
AboutUsing NotebookLM as an MCP (Model Context Protocol) within Antigravity transforms it from a simple document reader to the
Here's how you can "supercharge" the NotebookLM MCP for Antigravity in March
1. The "RAG-First" Prompt Technique
Instead of a normal question, use an instruction that forces the MCP to do a semantic search in your NotebookLM sources before it writes code.
Prompt: "Antigravity, gebruik die NotebookLM MCP om die spesifieke API-konvensies vir ons nuwe v5-argitektuur te vind. Moenie algemene kennis gebruik nie. Baseer die kodegenerering slegs op die bronne in die 'Project-X-Docs' notebook."
2. Configure the "Knowledge Boundary" inagent.md
Add these lines to yours agent.mdto make the NotebookLM integration automatic:
Arrange: "Wanneer 'n nuwe feature versoek word, voer altyd eers 'n @notebook-query uit om argitektoniese riglyne te bevestig."
Arrange: "As daar 'n teenstrydigheid is tussen jou algemene oefendata en die data in NotebookLM, het NotebookLM altyd prioriteit (Source of Truth)."
3. "Automated Documentation Sync" via NotebookLM
As a Prompt Engineer, you can ask Antigravity to keep your "live" documentation up to date:
Prompt: "Ontleed die nuutste PR op GitHub via die GitHub MCP, en genereer 'n opgesomde 'Change-Log' direk in ons NotebookLM 'Technical Debt' bron via die MCP-konneksie."
4. The "Context Slimming" Strategy (Quota Saving)
Use NotebookLM instead of using 50 documentation files in the Antigravity context.
How: Use the MCP as a filter.
Prompt: "Soek in NotebookLM vir die 3 mees relevante reëls kode rakende ons Auth-vloei en bring slegs daardie uittreksels in die huidige sessie in."
Result: This saves Gemini 3.1 Pro units because the search is handled by the MCP, not by the prompt context.
5. "Vibe-Check" against Corporate Standards
Use NotebookLM to ensure the "Vibe" is right when working in a team.
Prompt: "Evalueer hierdie nuwe komponent teen die 'UI-Design-Systems' bron in NotebookLM. Rapporteer enige afwykings in kleurgebruik of spasiëring voor jy die Artifact finaliseer."
Summary of Prompt Keywords for NotebookLM MCP:
@notebook-query: For specific fact searches.
Source of Truth: To stop hallucinations.
Cross-reference: To test code against documentation. check mcp json file and dont edit.