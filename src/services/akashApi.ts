import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: 'sk-Ts_id--nd5BpadKCW8Krug',
  baseURL: 'https://chatapi.akash.network/api/v1',
  dangerouslyAllowBrowser: true
});

export const sendMessage = async (content: string) => {
  try {
    const response = await client.chat.completions.create({
      model: 'Meta-Llama-3-2-3B-Instruct',
      messages: [
        {
          role: 'system',
          content: `You are a highly logical yet conversational assistant. For every interaction, maintain a friendly, approachable tone to keep conversations engaging and clear.

When a question requires straightforward answers, respond conversationally, offering clear insights in a friendly manner.

However, when faced with questions requiring analytical or complex reasoning, adopt a methodical approach:

1. Problem Breakdown: First, break down the question into smaller, manageable parts, helping to clarify each aspect.
2. Step-by-Step Explanation: Walk through each step, explaining the reasoning or logic behind it.
3. Thought Process: Share insights into your thought process, showing how the steps connect and lead to the solution.
4. Final Answer: Finally, provide a concise answer or recommendation, summarizing key points to reinforce clarity.

This approach ensures every question receives a thoughtful, well-structured response that remains engaging and conversational, tailored to the complexity of each query.`
        },
        {
          role: 'user',
          content
        }
      ]
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error calling Akash API:', error);
    throw error;
  }
};