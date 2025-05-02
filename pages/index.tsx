import React from 'react';
import styled from 'styled-components';
import { GlobalStyles } from '../components/GlobalStyles';
import questions from '../questions.json';
import Poll from '../components/Poll';
import Head from 'next/head';
import { QandA, QandAsDocument } from '../types';

const IndexPage = styled.main``;

const PageTitle = styled.h3`
  font-size: 2.4rem;
  font-weight: 800;
  margin-bottom: 32px;

  @media (max-width: 480px) {
    font-size: 1.6rem;
    margin-bottom: 24px;
  }
`;

const pageTitle = 'Decode React Poll Challenge';

type IndexProps = {
  qanda: QandA;
};

export default ({ qanda }: IndexProps) => (
  <>
    <Head>
      <title>{pageTitle}</title>
    </Head>
    <IndexPage>
      <GlobalStyles />
      <PageTitle>{pageTitle}</PageTitle>
      <p>
        Here is some text that is on the page in a paragraph tag. The poll will
        appear within this context below.
      </p>
      <Poll data={qanda} />
      <p>
        Here is the rest of the text on the page. We just have something down
        here for context to see it in.
      </p>
    </IndexPage>
  </>
);

export const getStaticProps = async () => {
  const json = questions as QandAsDocument;
  const data = json.questions;
  const randomIndex = Math.floor(Math.random() * data.length);
  const qanda = data[randomIndex];

  return {
    props: {
      qanda,
    },
  };
};
