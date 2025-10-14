# RPO-Course-Study-Material
RSH300 RPO Course Study Material

This web app is used as a study guide for the RSH300 RPO Course, a prerequisite course
for the RPO certification examination.

The quizzes will cover the Gneral Paper (based on course slides) and Category 2 and 3.

It will only serve as a guide and a supplementary resource for studying for the exam.

Some of the materials from Atom Malaysia will be referenced in this website as well.

# How to contribute
Generate a `quiz_data.json` based on the structure below:
```
[
    {
        "question": "question',
        "options": ["option 1",
                    "option 2",
                    "option 3",
                    "option 4"],
        "answer": "answer matches one of the strings in options array"
    }
]
```

Open a PR with the json and specify which section the quiz will be placed in.