// import { openai } from '@ai-sdk/openai'
// import { StreamingTextResponse, streamText } from 'ai'

export async function POST(req: Request) {
  const data = await req.json();
  console.log("data===>", data);
  return Response.json(data);

  // const result = await streamText({
  //   model: openai('gpt-4-turbo'),
  //   messages,
  // })

  // return new StreamingTextResponse(result.toAIStream())
}
