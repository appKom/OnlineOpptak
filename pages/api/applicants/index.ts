import { NextApiRequest, NextApiResponse } from "next";
import { createApplicant, getApplicants } from "../../../lib/mongo/applicants";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { applicantType } from "../../../lib/types/types";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(403).json({ error: "Access denied, no session" });
  }

  try {
    if (req.method === "GET") {
      if (session.user?.role !== "admin") {
        return res.status(403).json({ error: "Access denied, unauthorized" });
      }
      const { applicants, error } = await getApplicants();
      if (error) throw new Error(error);
      return res.status(200).json({ applicants });
    }

    if (req.method === "POST") {
      const applicantData = req.body as applicantType;

      if (applicantData.owId !== session.user?.owId) {
        return res
          .status(403)
          .json({ error: "Access denied, unauthorized operation" });
      }

      applicantData.date = new Date(new Date().getTime() + 60 * 60 * 1000); // add date with norwegain time (GMT+1)

      const { applicant, error } = await createApplicant(applicantData);
      if (error) throw new Error(error);
      return res.status(201).json({ applicant });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
    res.status(500).json("An unexpected error occurred");
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).end(`Method ${req.method} is not allowed.`);
};

export default handler;
