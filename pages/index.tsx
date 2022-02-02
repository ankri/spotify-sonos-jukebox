import type { GetServerSideProps, NextPage } from "next";

export const Home: NextPage = () => {
  return null;
};

export const getServerSideProps: GetServerSideProps = async ({}) => {
  return {
    props: {},
    redirect: {
      to: "/music",
      permanent: false,
    },
  };
};

export default Home;
