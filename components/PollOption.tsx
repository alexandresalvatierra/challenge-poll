import React, { memo } from 'react';
import styled from 'styled-components';
import posed from 'react-pose';
import type { Answer } from '../types';
import { useCountUp } from '../hooks/useCountUp';

interface PollOptionProps {
  answer: Answer;
  isSelected: boolean;
  isMostVoted: boolean;
  hasVoted: boolean;
  totalVotes: number;
  onSelect: () => void;
}

const AnimatedBar = posed.div({
  hidden: { width: '0%' },
  visible: { width: (props: any) => `${props.width}%` },
});

const FadeIn = posed.div({
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
});

const OptionButton = styled.button<{
  voted: boolean;
  mostVoted: boolean;
}>`
  position: relative;
  z-index: 1;

  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  padding: 14px 16px;
  margin-bottom: 16px;

  border: 1px solid #ccc;
  border-radius: 6px;

  font-size: 1.25rem;
  font-weight: ${({ voted, mostVoted }) =>
    voted && mostVoted ? 'bold' : 'normal'};

  background: #fff;

  cursor: ${({ voted }) => (voted ? 'default' : 'pointer')};
  transition: background 0.2s;

  &:hover {
    background: ${({ voted }) => (voted ? 'inherit' : '#f7f7f7')};
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    padding: 12px 14px;
  }
`;

const ResultBarContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 0;
  overflow: hidden;
`;

const ResultBar = styled(AnimatedBar)<{ mostVoted: boolean }>`
  height: 100%;
  border-radius: 6px;
  background: ${({ mostVoted }) =>
    mostVoted ? '#D7FCF7' : 'rgba(0, 0, 0, 0.08)'};
  transition: background 0.4s ease;
`;

const AnswerRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
  z-index: 1;
`;

const Percentage = styled.div<{
  voted: boolean;
  mostVoted: boolean;
}>`
  font-weight: ${({ voted, mostVoted }) =>
    voted && mostVoted ? 'bold' : 'normal'};
  position: relative;
  z-index: 1;
`;

const CheckIcon = styled.img`
  width: 32px;
  height: 32px;
  position: absolute;
  top: -4px;
  right: -36px;

  @media (max-width: 480px) {
    width: 20px;
    height: 20px;
    top: 0;
    right: -20px;
  }
`;

const PollOption = ({
  answer,
  isMostVoted,
  isSelected,
  hasVoted,
  totalVotes,
  onSelect,
}: PollOptionProps) => {
  const percent = totalVotes
    ? Math.round((answer.votes / totalVotes) * 100)
    : 0;

  const animatedPercent = useCountUp(hasVoted ? percent : 0);

  return (
    <OptionButton
      voted={hasVoted}
      mostVoted={isMostVoted}
      onClick={() => !hasVoted && onSelect()}
    >
      {hasVoted && (
        <ResultBarContainer>
          <ResultBar
            pose="visible"
            initialPose="hidden"
            width={percent}
            mostVoted={isMostVoted}
          />
        </ResultBarContainer>
      )}

      <AnswerRow>
        <span>{answer.text}</span>
        {hasVoted && isSelected && (
          <FadeIn initialPose="hidden" pose="visible">
            <CheckIcon
              src={require('../static/check-circle.svg')}
              alt="selected"
            />
          </FadeIn>
        )}
      </AnswerRow>

      {hasVoted && (
        <Percentage voted={hasVoted} mostVoted={isMostVoted}>
          {animatedPercent}%
        </Percentage>
      )}
    </OptionButton>
  );
};

export default memo(PollOption);
