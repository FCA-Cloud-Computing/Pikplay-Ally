export default function handler(req, res) {
    const response = [
        {
            "available_numbers": 82,
            "award_link": "/publicacion/nuevas-figuritas-de-kimetsu-no-yaiba-pregunta-por-tu-favorita",
            "created_at": "2024-01-17T02:56:34.000Z",
            "description": "la mejor",
            "id": 3,
            "image": "/images/others/ps4.png",
            "is_active": true,
            price: 32000,
            "slug": "act-1-figuritas-de-kimetsu-no-yaiba",
            "title": "Act 1. Figuritas De Kimetsu No Yaiba",
            "user_id": 2,
            members_capacity: 52,
            "members": [
                {
                    "id": 58,
                    "created_at": "2024-05-27T03:23:13.000Z",
                    "user_id": 2,
                    "uid": 2,
                    "number": 12,
                    "is_paid": 1
                }
            ],
            "seller": {
                "uid": 2,
                "name": "Videojuegos Barranquilla",
                "is_certificated": false,
                "login_code": 1234,
                "city": null,
                "email": null,
                "phone": "570123456789",
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjU3MDEyMzQ1Njc4OSIsImNvZGUiOjEyMzQsImlhdCI6MTcxMDgxNDQwNSwiZXhwIjoxNzEwODE0NDY1fQ.Il9iRiORJ0odDNKVz_2tfEA_gog4S4G_hxQmVGZ7_zk",
                "is_admin": false,
                "picture": "https://pikplay-bucket.nyc3.cdn.digitaloceanspaces.com/users/249263907_1579120929120614_8207233636537883288_n.jpg",
                "identification_number": null,
                "created_at": "2024-01-17T04:08:17.000Z"
            }
        },
        {
            "available_numbers": 82,
            "created_at": "2024-01-17T02:56:34.000Z",
            "description": "la mejor",
            "id": 3,
            "image": "/images/others/ps4.png",
            "is_active": true,
            "slug": "act-2-playstation-5-slim",
            "title": "Act 2. Playstation 5 Slim",
            "user_id": 2,
            members_capacity: 52,
            "members": [
                {
                    "id": 58,
                    "title": "Act 2. Playstation 5 Slim",
                    "slug": "act-2-playstation-5-slim",
                    "description": "la mejor",
                    "created_at": "2024-05-27T03:23:13.000Z",
                    "user_id": "1",
                    "competition_id": 3,
                    "number": 12,
                    "is_paid": 1
                }
            ],
            "seller": {
                "uid": 2,
                "name": "Blue Panter Store",
                "is_certificated": false,
                "login_code": 1234,
                "city": null,
                "email": null,
                "phone": "570123456789",
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjU3MDEyMzQ1Njc4OSIsImNvZGUiOjEyMzQsImlhdCI6MTcxMDgxNDQwNSwiZXhwIjoxNzEwODE0NDY1fQ.Il9iRiORJ0odDNKVz_2tfEA_gog4S4G_hxQmVGZ7_zk",
                "is_admin": false,
                "picture": "https://pikplay-bucket.nyc3.cdn.digitaloceanspaces.com/users/1716992297692-bluepanther-image.jpeg",
                "identification_number": null,
                "created_at": "2024-01-17T04:08:17.000Z"
            }
        }
    ]
    res.status(200).json(response)
}
