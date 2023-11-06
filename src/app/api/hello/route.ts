// Test in URL localhost:3000/api/hello
// http methods

export async function GET(request: Request) {
  return new Response('hi')
}