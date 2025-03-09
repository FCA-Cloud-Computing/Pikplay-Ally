export default function handler(req, res) {
    const response = {
        "code": 200,
        "data": [
            {
                "id": 1,
                "uid": 1,
                "pid": 16,
                "experience_type": "PURCHASE",
                "value": 1000
            },
            {
                "id": 2,
                "uid": 1,
                "pid": 16,
                "experience_type": "PURCHASE",
                "value": 5000
            }
        ]
    }
    res.status(200).json(response)
}
