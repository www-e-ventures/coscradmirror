# Making Post Requests to API

## Sample Data

Let's say you want to post the following `Term`:

```js
{
    "id": "3",
    "term": "test-term-3",
    "termEnglish": "his or her hand",
    "contributor": "William Myers"
  }
```

then you can submit the following post request via CURL:

> > `curl -X POST -H "Content-Type: application/json" -d '{"id":"6","term":"test-term-6","contributor":"William Myers"}' http://localhost:3333/api/terms`

If you'd like to post many, just send an array of `DTOs`:

> > `curl -X POST -H "Content-Type: application/json" -d '[{"id":"7","term":"gubela","contributor":"William Myers"},{"id":"8","term":"test term","contributor":"William Myers"}]' http://localhost:3333/api/terms/many`
