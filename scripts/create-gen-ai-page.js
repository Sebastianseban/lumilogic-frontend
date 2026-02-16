const axios = require('axios');

const API_URL = 'http://localhost:4000/api/v1';

const createPage = async () => {
  const email = process.argv[2];
  const password = process.argv[3];

  if (!email || !password) {
    console.error('Please provide email and password as arguments.');
    console.error('Usage: node scripts/create-gen-ai-page.js <email> <password>');
    process.exit(1);
  }

  try {
    // 1. Login
    console.log('Logging in...');
    const loginRes = await axios.post(`${API_URL}/admin/login`, {
      email,
      password,
    });

    const token = loginRes.data.data.accessToken;
    if (!token) {
      throw new Error('No access token received');
    }
    console.log('Login successful.');

    // 2. Page Data
    const pageData = {
      title: 'Generative AI Solutions',
      slug: 'generative-ai-solutions',
      type: 'service',
      isPublished: true,
      seo: {
        title: 'Generative AI Solutions | LumiLogic',
        description: 'Unlock new possibilities with our cutting-edge Generative AI solutions.',
      },
      blocks: [
        {
          id: Date.now().toString() + '1',
          type: 'hero',
          data: {
            heading: 'Revolutionize Your Business with Generative AI',
            subheading: 'From content creation to code generation, we help you harness the power of AI.',
            description: 'LumiLogic provides end-to-end Generative AI consulting and development services. We help enterprises integrate Large Language Models (LLMs) and diffusion models to automate workflows and drive innovation.',
            ctaText: 'Explore Solutions',
            ctaLink: '/contact',
          },
        },
        {
          id: Date.now().toString() + '2',
          type: 'feature_split',
          data: {
            heading: 'Custom LLM Fine-Tuning',
            description: 'We don\'t just use off-the-shelf models. We fine-tune state-of-the-art LLMs (like GPT-4, Llama 3, Claude) on your proprietary data to create secure, domain-specific assistants that understand your business inside and out.',
            imagePosition: 'right',
          },
        },
        {
           id: Date.now().toString() + '3',
           type: 'services_grid',
           data: {
             heading: 'Our Generative AI Capabilities',
             description: 'Comprehensive services to accelerate your AI adoption.',
             services: [
               {
                 id: 's1',
                 title: 'Text Generation',
                 description: 'Automate reporting, content marketing, and customer support responses.',
                 icon: 'Box'
               },
               {
                 id: 's2',
                 title: 'Image & Video Synthesis',
                 description: 'Create marketing assets, product prototypes, and personalized media at scale.',
                 icon: 'Cloud'
               },
               {
                 id: 's3',
                 title: 'Code Copilots',
                 description: 'Boost developer productivity with custom AI coding assistants.',
                 icon: 'Database'
               },
               {
                 id: 's4',
                 title: 'Knowledge Retrieval (RAG)',
                 description: 'Chat with your enterprise documents securely using RAG pipelines.',
                 icon: 'Shield'
               }
             ]
           }
        },
        {
            id: Date.now().toString() + '4',
            type: 'benefits_grid',
            data: {
                heading: 'Why Invest in GenAI?',
                description: 'The competitive advantage of the future.',
                benefits: [
                    {
                        id: 'b1',
                        title: '10x Productivity',
                        description: 'Automate repetitive cognitive tasks and free up your team for strategic work.',
                        icon: 'Zap'
                    },
                    {
                        id: 'b2',
                        title: 'Personalized Experiences',
                        description: 'Deliver hyper-personalized content to millions of users instantly.',
                        icon: 'Star'
                    },
                    {
                        id: 'b3',
                        title: 'Faster Time-to-Market',
                        description: 'Accelerate product development cycles with AI-assisted design and coding.',
                        icon: 'CheckCircle'
                    }
                ]
            }
        },
        {
            id: Date.now().toString() + '5',
            type: 'process_grid',
            data: {
                heading: 'Implementation Roadmap',
                description: 'How we guide you from concept to deployment.',
                steps: [
                    {
                        id: 'p1',
                        title: 'Discovery & Feasibility',
                        description: 'We analyze your data and use cases to identify high-impact GenAI opportunities.'
                    },
                    {
                        id: 'p2',
                        title: 'Proof of Concept (PoC)',
                        description: 'Rapid prototyping to validate the technical feasibility and business value.'
                    },
                    {
                        id: 'p3',
                        title: 'Model Fine-Tuning',
                        description: 'Training models on your secure data infrastructure.'
                    },
                    {
                         id: 'p4',
                         title: 'Deployment & Monitoring',
                         description: 'Production deployment with robust guardrails and performance monitoring.'
                    }
                ]
            }
        }
      ],
    };

    // 3. Create Page
    console.log('Creating page...');
    const createRes = await axios.post(`${API_URL}/admin/pages`, pageData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('Page created successfully!');
    console.log('Page ID:', createRes.data.data._id);
    console.log('Slug:', createRes.data.data.slug);

  } catch (error) {
    console.error('Error:', error.response?.data?.message || error.message);
    if (error.response?.data) {
        console.error('Details:', JSON.stringify(error.response.data, null, 2));
    }
  }
};

createPage();
