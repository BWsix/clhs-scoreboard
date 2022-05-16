import { Title } from "@mantine/core";
import Head from "next/head";
import React from "react";

interface Props {
  title: string;
  onlyPageTitle?: boolean;
}

export const getPageLayout = ({ title, onlyPageTitle }: Props) => {
  return function getLayout(page: React.ReactElement) {
    return (
      <>
        <Head>
          <title>壢中Scoreboard - {title}</title>
        </Head>
        {!onlyPageTitle && (
          <Title order={3} pb="sm">
            {title}
          </Title>
        )}
        {page}
      </>
    );
  };
};
