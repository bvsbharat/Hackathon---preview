import type { Project, VideoInfo } from '../types';

export const rawData = `Rank,Team Name,Team Members,Team Size,Impact,Demo,Creativity,Pitch,Total,Highlights & supporting evidence,GitHub,YouTube,feedback,,,
1,ArthaNethra,"Devi Eswar Kumar Damerla; Mohan Priya Mulagapu",2,23,46,14,9,92,"Addresses due‑diligence, loan‑portfolio risk and fraud by building a knowledge‑graph‑native investigation platform. ADE extracts structured data from financial documents and Claude Haiku extracts entities; extracted facts and relationships are stored in Neo4j/Weaviate. The system performs hybrid relationship detection, cross‑document sessions and graph‑augmented chat to surface hidden risks and explain reasoning. The graph‑based interface and multi‑agent reasoning are innovative and provide a high‑impact tool for auditors and regulators.",https://github.com/devieswar/ArthaNethra,https://youtu.be/QdXCNYUUAPg,,,,
2,LoanLens AI,"Abhisek Banerjee; Tanika Gupta; Anand Kumar; Mohd Zain; Ritesh Kumar; Rahul kushwaha; Abhishek Thombre; Nilanjan Sahu",8,23,46,14,9,92,"Automates manual loan‑underwriting tasks. ADE ingests loan applications, bank statements and tax forms; a credit‑decision engine calculates metrics (DTI, credit score, DSCR, LTV, etc.) and flags fraud patterns. The system offers interactive chat with citations and audit trail and integrates AWS Bedrock LLMs. Comprehensive feature set and strong demonstration give high marks on impact and demo.",https://github.com/rrahul1011/loanlens_ai/tree/ds_integration_v2,https://www.youtube.com/watch?v=iKqOY-Nobv8,,,,
3,TMC-v1 (W11),Nitish Dandu,1,20,40,11,7,78,"Automates invoice processing for accounts payable. ADE extracts vendor information, invoice metadata, line items and payment details; the system matches invoices with purchase orders and uses Stripe for payments. The readme emphasises time savings, error reduction and faster payment cycles. Useful but less innovative relative to others.",https://github.com/invst-git/tmc-v1,https://youtu.be/JegVT3a4zgk,,,,
4,Pura Vida Sloth,"Oscar Montes; Michael Varela",2,21,40,14,7,82,"FinTech hype‑cycle intelligence system that collects data from 14 sources (e.g., SEC filings via ADE, patents, news), processes them with GPT‑4o mini and ADE, and uses a 12‑agent LangGraph state machine for innovation, adoption, narrative and risk scoring. Outputs interactive hype‑cycle charts. Creative multi‑agent design but more market‑insights oriented.",https://github.com/omontes/pura-vida-sloth,https://youtu.be/9g3f8udjWU0,"Clear recording - use ai tool like 11labs and convert",,,
5,ParetoOptimal Agents,Nate Mauer,1,21,43,13,7,84,"A multi‑agent trading platform that ingests economic documents (tariff schedules, commodity data, sentiment proxies) via ADE, uses MADDPG + QMIX reinforcement learning to find Pareto‑optimal policies, and leverages LLMs for sentiment analysis and policy reasoning. The fusion of RL and document extraction is creative, though the financial impact is more speculative.",https://github.com/n8mauer/ParetoOptimalAgents,https://youtu.be/lzYugeCFIoU,,,,
6,DocuFlow (Skywalkers77),"Yatharth Mogra; Hemanth Marupudi; Krish Jani; Riddhi Raina Prasad",4,20,43,12,7,82,"DocuFlow provides an intelligence layer for finance teams to process invoices and contracts. The pipeline sends PDFs to ADE Parse and Extract, then vectors them via Gemini embeddings and stores results in PostgreSQL. It includes typed gateways to validate payloads, status dashboards and an AI chat panel for document Q&A. The backend exposes APIs for document upload, ADE integration, vectorization and RAG queries.",https://github.com/orgs/aws-financial-ai-hack-skywalkers77/repositories,https://youtu.be/VeF_WH0lBcg,,,,
7,"Serimag – FakePay","Sergio Santamaria; Hugo Cortada",2,20,42,12,8,82,"Automatic pay‑stub verification. The pipeline classifies documents, detects AI‑generated forgeries (via AIorNOT), extracts fields with ADE, applies rules and scores authenticity. It provides a full architecture from upload to report generation. Useful for lenders but niche compared to top entries.",https://github.com/serimag/landinghack-fakepay/tree/main,https://www.youtube.com/watch?v=-vNP2rP7Kvs,,,,
8,"Fintrid – TRID Compliance","Jaya Raj Srivathsav Adari; Abhishek Mamidipally",2,20,41,12,7,80,"Automates U.S. mortgage TRID compliance. The pipeline ingests Loan Estimate (LE) and Closing Disclosure (CD) PDFs, extracts structured data using Landing AI + Gemini, detects document type, matches borrower‑paid fees, detects reclassified fees, evaluates tolerance buckets, generates annotated PDF diffs and builds curated compliance reports. Addresses a specific regulatory problem with a clear demo, though narrower in scope.",https://github.com/Srivathsav-max/fintrid,https://youtu.be/5HzJYRIXMAk,,,,
9,"PactProof – Compliance Invoice Reconciliation",Kaushik Holla,1,21,43,12,8,84,"Automates matching of supplier invoices against contracts. ADE extracts invoice data and contract terms, and deterministic rules check unit‑price variance, quantity caps and payment terms. Exception notes reference document coordinates for auditing. The web app supports uploads, live preview and rule‑engine results. Addresses a real enterprise pain point with a solid demo.",https://github.com/kaushik-holla/PactProof-Compliance-Invoice-Reconciliation/tree/main,https://youtu.be/3JVC2obJunU,"final demo keep smaller intro of yourself and stroger problem statement",,,
10,Eagle (PortfolioMosaic),Sivasundharam,1,22,44,13,9,88,"Tackles the problem of investors holding multiple brokerage accounts with scattered statements. Users upload various statements; ADE extracts positions, transactions and balances; a vector store and GPT‑4 reasoning layer answer questions across accounts and produce dashboards. Offers natural‑language Q&A and cross‑account aggregation, making a useful personal‑finance tool.",https://github.com/sivasundharam/PortfoliMosaic,https://youtu.be/vH5-Af0NfU4,"Make video transcripts more clear. Currently, audio is not clear to understand what's going on. ",,,
11,Counterparty-Margin-Collateral-Agent,Beemnet Haile,1,21,44,13,8,86,"Automates margin management for OTC derivatives. ADE extracts credit-support annex terms, normalizes collateral tables, computes margin requirements with a deterministic engine and uses LLM to generate explanations. It exposes 21 API endpoints and includes full test coverage. Robust functionality and compliance focus yield high scores.",https://github.com/bhaile-code/Counterparty-Margin-Collateral-Agent-v2,https://youtu.be/82M2igQHz0M,,,,
12,ADE-gotiator,"Forrest Pan; Jitender Thakur",2,20,40,13,8,81,"Streamlines contract negotiation. ADE extracts key terms, then risk dashboards compare original and extracted clauses and an AI assistant suggests market‑competitive alternatives. Users can interactively modify clauses, view risk scores and run negotiation scripts. Unique but narrower in scope than higher‑ranked entries.",https://github.com/panforrest/ADE-gotiator,https://www.youtube.com/watch?v=H_u9Wc3LahU,,,,
13,CrediLens,"Aurokrishnaa Ravindran Lakshmi; Nithin Rogan A; Hariharan S",3,20,42,12,8,82,"Evaluates credit health from 10‑K/annual reports. ADE extracts tables and text, then structured data feeds ratio and scoring engines. A pipeline stores data in FAISS, builds a knowledge‑graph, generates LLM summaries and produces a downloadable credit report. Useful for investment analysts and well documented.",https://github.com/Rogan-afk/credilens.app,https://youtu.be/2ttvT7-4H10,,,,
14,"FraudLensAI (Finbuster)",Abishek Muralikrishna,1,22,44,13,8,87,"Multi‑agent system to detect insurance‑claim fraud. ADE extracts claim documents; agents identify inconsistencies, match patterns against a fraud database, perform geospatial checks and assign risk scores. A RAG chat interface allows underwriters to ask natural‑language questions about claims and view interactive dashboards. High impact in reducing claim fraud and well‑executed demo.",https://github.com/Abi5678/Finbuster_landingAI_FraudLensAI,https://youtu.be/0hUnlTnXpp8,"Improve UI, layout is mobile one, please record it proeplery ",,,
15,"Diligent (MNA-agent)",Ayaan,1,22,44,13,8,87,"A due‑diligence assistant that extracts 39 fields from PDFs using ADE, normalizes data with Pathway, computes financial ratios and loads semantic embeddings. Gemini decomposes user questions into sub‑queries and synthesizes answers with citations. The pipeline supports multi‑document queries and produces audit‑ready answers, showing strong demo and impact for finance teams.",https://github.com/manuvikash/mna-agent,https://youtu.be/VKW7LaO2ntI,,,,
16,AI RiskGuard,Venkatraman Rajaram,1,20,40,12,8,80,"Risk‑intelligence platform that scores transactions, detects anomalies, explains decisions via LLM and maps relationships in a graph database. It aims to reduce fraud losses and increase audit productivity. Good impact but demo seems less complete than top entries.",https://github.com/vramanr/AIRiskGuard.git,,video is pending,,,
17,"FinGenie – Financial Document Intelligence",Surendra Singh,1,19,38,11,7,75,"Simplified agent that uses ADE for extraction, FAISS for indexing and AWS Bedrock for reasoning to answer questions about uploaded PDFs. Includes a Streamlit UI for uploading documents, searching and chatting. Functional but less feature‑rich than higher‑ranked projects.",https://github.com/sss483492/financial-doc-agent,https://youtu.be/Pt2Q8iQ25lI,,,,
18,"FinanceFlow AI (SnowFlow)","Dharaneesh CKV; Sudip Manchare",2,20,42,12,7,81,"Processes financial documents and loads structured data into Snowflake. ADE extracts key fields, Google Gemini performs analysis, and LangGraph orchestrates tasks. Components include schema designer, Snowflake deployer, and UI for uploading and analyzing documents.",https://github.com/dharaneesh71/Financeflow_ai,https://youtu.be/rbdXRPEVgTU,,,,
19,"Caballo Money",Paul Garcia,1,19,38,11,7,75,"AI‑powered DeFi companion that assesses a user’s risk tolerance, explains liquidity pools, and automatically deploys capital across chains. It uses conversational AI, risk scoring and cross‑chain deposit via Circle CCTP. Interesting application of AI in cryptocurrency but not directly tied to ADE extraction.",https://github.com/pbrain19/caballo-money,https://www.loom.com/share/4a0492ec748a4116915424d63e7801a4,,,,
`;

const getVideoInfo = (url: string): VideoInfo | null => {
  if (!url || typeof url !== 'string' || url.toLowerCase() === 'no') return null;

  try {
    const urlObj = new URL(url);
    
    // YouTube
    if (urlObj.hostname.includes('youtube.com') || urlObj.hostname.includes('youtu.be')) {
      let videoId = urlObj.searchParams.get('v');
      if (!videoId) {
        videoId = urlObj.pathname.split('/').pop() || null;
      }
      if (videoId) {
        return {
          embedUrl: `https://www.youtube.com/embed/${videoId}`,
          thumbnailUrl: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
          source: 'YouTube',
        };
      }
    }
    
    // Loom
    if (urlObj.hostname.includes('loom.com')) {
      const parts = urlObj.pathname.split('/');
      const videoId = parts[parts.length - 1];
      if (videoId) {
        return {
          embedUrl: `https://www.loom.com/embed/${videoId}`,
          thumbnailUrl: `https://cdn.loom.com/sessions/thumbnails/${videoId}-00001.gif`,
          source: 'Loom',
        };
      }
    }

    // Vimeo
    if (urlObj.hostname.includes('vimeo.com')) {
      const videoId = urlObj.pathname.split('/').pop();
      if (videoId && /^\d+$/.test(videoId)) {
        return {
          embedUrl: `https://player.vimeo.com/video/${videoId}`,
          thumbnailUrl: `https://picsum.photos/seed/${videoId}/480/360`, // Vimeo thumbnails are tricky, using placeholder
          source: 'Vimeo',
        };
      }
    }
  } catch (error) {
    // Invalid URL, ignore and return null
    return null;
  }

  return null;
};

const parseCsvLine = (line: string): string[] => {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"' && line[i - 1] !== '\\') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            result.push(current.trim());
            current = '';
        } else {
            current += char;
        }
    }
    result.push(current.trim());
    return result.map(val => val.startsWith('"') && val.endsWith('"') ? val.slice(1, -1) : val);
};

export const parseProjects = (data: string): Project[] => {
  const lines = data.trim().split(/\r?\n/).slice(1); // Skip header row, handle CRLF and LF
  return lines.map((line, index) => {
    const columns = parseCsvLine(line);
    const youtubeLink = columns[11] || '';
    
    return {
      id: index,
      rank: parseInt(columns[0], 10) || index + 1,
      teamName: columns[1] || `Project ${index + 1}`,
      members: columns[2] || 'N/A',
      teamSize: columns[3] || 'N/A',
      impact: columns[4] || 'N/A',
      demo: columns[5] || 'N/A',
      creativity: columns[6] || 'N/A',
      pitch: columns[7] || 'N/A',
      total: columns[8] || 'N/A',
      highlights: columns[9] || 'No highlights provided.',
      githubLink: columns[10] || 'N/A',
      youtubeLink: youtubeLink,
      feedback: columns[12] || 'No feedback.',
      videoInfo: getVideoInfo(youtubeLink),
    };
  });
};

const csvEscape = (str: string | number | undefined): string => {
    const s = String(str || '');
    if (s.includes(',') || s.includes('"') || s.includes('\n')) {
        // Escape quotes by doubling them and wrap the whole string in quotes
        return `"${s.replace(/"/g, '""')}"`;
    }
    return s;
};

export const projectsToCsv = (projects: Project[]): string => {
    const header = "Rank,Team Name,Team Members,Team Size,Impact,Demo,Creativity,Pitch,Total,Highlights & supporting evidence,GitHub,YouTube,feedback,,,";
    const rows = projects.map(p => [
        p.rank,
        csvEscape(p.teamName),
        csvEscape(p.members),
        csvEscape(p.teamSize),
        csvEscape(p.impact),
        csvEscape(p.demo),
        csvEscape(p.creativity),
        csvEscape(p.pitch),
        csvEscape(p.total),
        csvEscape(p.highlights),
        csvEscape(p.githubLink),
        csvEscape(p.youtubeLink),
        csvEscape(p.feedback),
        '', '', '' // for the extra empty columns
    ].join(','));
    return [header, ...rows].join('\n');
};