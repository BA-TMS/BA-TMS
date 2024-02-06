import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Fetch all consignees
      const consignees = await prisma.consignee.findMany();
      res.status(200).json(consignees);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch consignees' });
    }
  } else if (req.method === 'POST') {
    try {
      // Extract consignee details from request body
      const { name, address, addressAddOn, city, state, postCountry, postCode, telCountry, telephone } = req.body;
      // Create a new consignee
      const newConsignee = await prisma.consignee.create({
        data: {
          name,
          address,
          addressAddOn,
          city,
          state,
          postCountry,
          postCode,
          telCountry,
          telephone,
        },
      });
      res.status(201).json(newConsignee);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create consignee' });
    }
  } else {
    // If the request method is neither GET nor POST
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
