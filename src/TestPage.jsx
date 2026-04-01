import React, { useEffect, useState, useCallback } from "react";
import API from "./api"; // ✅ use API
import { useParams, useNavigate } from "react-router-dom";

import {
  Container,
  Typography,
  Card,
  CardContent,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  TextField,
  Box,
  LinearProgress
} from "@mui/material";

function TestPage() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [loading, setLoading] = useState(true);

  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);
  const [violations, setViolations] = useState(0);

  const studentId = localStorage.getItem("userId");

  // ✅ LOAD QUESTIONS
  useEffect(() => {
    Promise.all([
      API.get(`/questions/test/${id}`),
      API.get("/tests/all")
    ])
    .then(([qRes, tRes]) => {

      setQuestions(qRes.data);

      const test = tRes.data.find(t => t.id === Number(id));
      if (test) {
        setTimeLeft(test.duration * 60);
      }

      setLoading(false);
    });
  }, [id]);

  // ✅ TIMER
  useEffect(() => {
    if (timeLeft <= 0 || submitted) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, submitted]);

  // ✅ SUBMIT TEST
  const submitTest = useCallback(() => {
    API.post(`/submit/${id}`, { studentId, answers })
      .then(res => {
        setScore(res.data.score);
        setSubmitted(true);
      });
  }, [id, answers, studentId]);

  // AUTO SUBMIT
  useEffect(() => {
    if (!loading && timeLeft === 0 && !submitted) {
      submitTest();
    }
  }, [timeLeft, loading, submitted, submitTest]);

  // TAB SWITCH DETECTION
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && !submitted) {

        setViolations(prev => {
          const newCount = prev + 1;

          API.post("/violations/log", {
            type: "TAB_SWITCH",
            duration: 0
          }).catch(() => {});

          if (newCount >= 3) {
            alert("Too many tab switches! Test will be auto-submitted.");
            submitTest();
          }

          return newCount;
        });

      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);

  }, [submitted, submitTest]);

  const handleAnswer = (qid, val) => {
    setAnswers(prev => ({ ...prev, [qid]: val }));
  };

  const exitTest = () => {
    navigate("/student");
  };

  if (loading) {
    return <LinearProgress />;
  }

  return (

    <Container maxWidth="md" style={{ marginTop: "20px" }}>

      <Typography variant="h4" align="center" gutterBottom>
        Online Test
      </Typography>

      {!submitted && (
        <Box className="test-header">
          <Typography className="timer">
            ⏳ {Math.floor(timeLeft / 60)}:
            {("0" + (timeLeft % 60)).slice(-2)}
          </Typography>

          <Typography className="warning">
            ⚠ Tab Switch: {violations}/3
          </Typography>
        </Box>
      )}

      {submitted ? (

        <Card className="result-card">
          <CardContent style={{ textAlign: "center" }}>
            <Typography variant="h4">
              🎉 Your Score: {score}
            </Typography>

            <Button
              variant="contained"
              color="success"
              onClick={exitTest}
              sx={{ mt: 3 }}
            >
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>

      ) : (

        <>
          {questions.map((q, index) => (

            <Card key={q.id} className="question-card">
              <CardContent>

                <Typography className="question-title">
                  Q{index + 1}. {q.question}
                </Typography>

                {q.type === "MCQ" && (
                  <RadioGroup
                    value={answers[q.id] || ""}
                    onChange={(e) => handleAnswer(q.id, e.target.value)}
                  >
                    {["A", "B", "C", "D"].map(opt => (
                      <FormControlLabel
                        key={opt}
                        value={opt}
                        control={<Radio />}
                        label={q["option" + opt]}
                        className="option"
                      />
                    ))}
                  </RadioGroup>
                )}

                {q.type === "CODING" && (
                  <Box mt={2}>
                    <Typography className="sample">
                      Sample Input: {q.sampleInput}
                    </Typography>

                    <TextField
                      multiline
                      rows={4}
                      fullWidth
                      placeholder="Write your code..."
                      value={answers[q.id] || ""}
                      onChange={(e) => handleAnswer(q.id, e.target.value)}
                    />
                  </Box>
                )}

              </CardContent>
            </Card>

          ))}

          <Box textAlign="center" mt={3}>
            <Button
              variant="contained"
              size="large"
              className="submit-btn"
              onClick={submitTest}
            >
              Submit Test
            </Button>
          </Box>
        </>
      )}

    </Container>
  );
}

export default TestPage;