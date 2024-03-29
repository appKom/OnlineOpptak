import { NextApiRequest, NextApiResponse } from "next";
import { updateAvailableTimes } from "../../../../lib/mongo/committees";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { committeeId } = req.query;

  if (typeof committeeId !== "string") {
    return res.status(400).json({ error: "Invalid committeeId" });
  }

  if (req.method === "PUT") {
    const times: [{ start: string; end: string }] = req.body;

    if (!Array.isArray(times)) {
      return res.status(400).json({ error: "Invalid times format" });
    }

    try {
      await updateAvailableTimes(committeeId, times);
      return res
        .status(200)
        .json({ message: "Available times updated successfully" });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  res.setHeader("Allow", ["PUT"]);
  res.status(405).end(`Method ${req.method} is not allowed.`);
};

export default handler;
