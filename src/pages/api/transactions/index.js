export default function handler(req, res) {
  const response = {
    code: 200,
    transactions: [
      {
        orderId: 1,
        created: "2021-08-15",
        customer: "John Smith",
        total: 45000.75,
        profit: 15000.25,
        updated: "2021-08-16",
      },
      {
        orderId: 2,
        created: "2021-09-02",
        customer: "Jane Doe",
        total: 120000.50,
        profit: 40000.20,
        updated: "2021-09-02",
      },
      {
        orderId: 3,
        created: "2021-10-10",
        customer: "Michael Brown",
        total: 300000.99,
        profit: 100000.33,
        updated: "2021-10-11",
      },
      {
        orderId: 4,
        created: "2021-11-20",
        customer: "Emily Johnson",
        total: 600000.00,
        profit: 200000.00,
        updated: "2021-11-21",
      },
      {
        orderId: 5,
        created: "2021-12-05",
        customer: "Chris Lee",
        total: 75000.88,
        profit: 25000.22,
        updated: "2021-12-06",
      },
      {
        orderId: 6,
        created: "2022-01-15",
        customer: "Samantha Davis",
        total: 950000.45,
        profit: 316666.82,
        updated: "2022-01-16",
      },
      {
        orderId: 7,
        created: "2022-02-22",
        customer: "Daniel Martinez",
        total: 360000.25,
        profit: 120000.10,
        updated: "2022-02-23",
      },
      {
        orderId: 8,
        created: "2022-03-12",
        customer: "Sophia Wilson",
        total: 410000.73,
        profit: 136666.91,
        updated: "2022-03-13",
      },
      {
        orderId: 9,
        created: "2022-04-01",
        customer: "James Anderson",
        total: 510000.67,
        profit: 170000.22,
        updated: "2022-04-02",
      },
      {
        orderId: 10,
        created: "2022-05-19",
        customer: "Olivia Clark",
        total: 290000.44,
        profit: 96666.81,
        updated: "2022-05-20",
      },
    ],
  };

  res.status(200).json(response);
}
