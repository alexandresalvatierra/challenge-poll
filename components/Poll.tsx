import React, { useState, useMemo, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import type { QandA, Answer } from '../types';
import PollOption from './PollOption';
import posed from 'react-pose';

interface PollProps {
  data: QandA;
}

const PollContainer = styled.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #e5e5e5;
  box-shadow: 0 0 16px #e5e5e5;
  margin: 56px auto;
  max-width: 400px;

  @media (max-width: 480px) {
    padding: 16px;
    margin: 32px auto;
  }
`;

const PollTitle = styled.h3`
  font-size: 1.6rem;
  font-weight: 600;
  margin-bottom: 24px;

  @media (max-width: 480px) {
    font-size: 1.25rem;
  }
`;

const TotalVotes = styled.div`
  margin-top: 20px;
  color: #b3b3b3;

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const AnimatedOption = posed.div({
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 500,
    },
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: {
      duration: 300,
    },
  },
  initialPose: 'exit',
});

const StaggerContainer = posed.div({
  enter: {
    staggerChildren: 400,
  },
});

export default function Poll({ data }: PollProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [mostVoted, setMostVoted] = useState('');
  const [answers, setAnswers] = useState<Answer[]>(data.answers);

  const totalVotes = useMemo(
    () => answers.reduce((sum, a) => sum + a.votes, 0),
    [answers]
  );

  const handleVote = useCallback(
    (answerText: string) => {
      if (hasVoted) {
        return;
      }
      const updated = answers.map((a) =>
        a.text === answerText ? { ...a, votes: a.votes + 1 } : a
      );
      setAnswers(updated);
      setSelected(answerText);
      setHasVoted(true);
    },
    [answers, hasVoted]
  );

  useEffect(() => {
    const max = Math.max(...answers.map((a) => a.votes));
    setMostVoted(answers.find((a) => a.votes === max)?.text ?? '');
  }, [answers]);

  return (
    <PollContainer>
      <PollTitle>{data.question.text}</PollTitle>

      <StaggerContainer initialPose="exit" pose="enter">
        {answers.map((answer) => (
          <AnimatedOption key={answer.text}>
            <PollOption
              answer={answer}
              isMostVoted={answer.text === mostVoted}
              isSelected={answer.text === selected}
              hasVoted={hasVoted}
              totalVotes={totalVotes}
              onSelect={() => handleVote(answer.text)}
            />
          </AnimatedOption>
        ))}
      </StaggerContainer>

      <TotalVotes>{totalVotes} votes</TotalVotes>
    </PollContainer>
  );
}
