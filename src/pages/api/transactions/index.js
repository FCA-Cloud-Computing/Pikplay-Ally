const transactions = [
  {
    id: 38,
    credits: 0,
    experience: 0,
    uid_seller: 120,
    description: null,
    status: 0,
    uid: 61,
    type: "PURCHASE",
    created_at: "2022-02-23T01:37:00.000Z",
    seller: {
      id: 120,
      name: "Example Seller",
      is_certificated: null,
      login_code: 5537,
      email: null,
      phone: "573015971458",
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjU3MzAxNTk3MTQ1OCIsImNvZGUiOjcxNTUsImlhdCI6MTczNDU2MzU3MH0.6bEic0CYvvRmX0Dsiwdre4ZZgjhqCvhPR7NIQqP5VHM",
      is_admin: false,
      picture: "/images/icons/user.png",
      city: null,
      created_at: "2024-12-18T23:07:20.000Z"
    }
  },
  {
    id: 39,
    credits: 0,
    experience: 0,
    uid_seller: 121,
    description: null,
    status: 0,
    uid: 61,
    type: "PURCHASE",
    created_at: "2022-02-23T01:37:00.000Z",
    seller: {
      id: 121,
      name: "Another Seller",
      is_certificated: null,
      login_code: null,
      email: null,
      phone: null,
      token: null,
      is_admin: false,
      picture: "/images/icons/user.png",
      city: null,
      created_at: "2024-12-19T15:30:26.000Z"
    }
  }
];

export default function handler(req, res) {
  if (req.method === 'GET') {
    const response = {
      data: transactions,
    };
    res.status(200).json(response);
  } else if (req.method === 'POST') {
    const newTransaction = req.body;
    newTransaction.id = transactions.length + 38; // Adjust ID generation logic as needed
    transactions.push(newTransaction);
    res.status(201).json({ code: 201, message: 'Transaction added successfully' });
  } else {
    res.status(405).json({ code: 405, message: 'Method not allowed' });
  }
}
