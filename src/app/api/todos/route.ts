import { NextApiRequest, NextApiResponse } from "next"

// export default function (req: NextApiRequest, res: NextApiResponse) {
//   return res.status(200).json({ message: "helo" })
// }

export async function GET() {
  return Response.json({ message: "hello" })
}
