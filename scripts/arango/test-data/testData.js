const testData = [
  {
    "collection": "terms",
    "databaseDTOs": [
      {
        "term": "Chil-term-1",
        "termEnglish": "Engl-term-1",
        "contributorId": "John Doe",
        "_key": "1"
      },
      {
        "term": "Chil-term-2",
        "termEnglish": "Engl-term-2",
        "contributorId": "John Doe",
        "_key": "2"
      },
      {
        "term": "Chil-term-no-english",
        "contributorId": "Jane Deer",
        "_key": "3"
      }
    ]
  },
  {
    "collection": "vocabulary_lists",
    "databaseDTOs": [
      {
        "name": "test VL 1 chil",
        "nameEnglish": "test VL 1 engl",
        "entries": [
          {
            "termId": "1",
            "variableValues": {
              "person": "11"
            }
          },
          {
            "termId": "2",
            "variableValues": {
              "person": "21"
            }
          }
        ],
        "variables": [
          {
            "name": "person",
            "type": "dropbox",
            "validValues": [
              {
                "display": "I",
                "value": "11"
              },
              {
                "display": "We",
                "value": "21"
              }
            ]
          }
        ]
      },
      {
        "name": "test VL 2 CHIL- no engl name",
        "entries": [
          {
            "termId": "2",
            "variableValues": {
              "person": "23"
            }
          }
        ],
        "variables": []
      }
    ]
  }
]
