import { AdminLayout } from "@layouts/AdminLayout";
import { GetServerSideProps, NextPage } from "next";
import * as React from "react";

const AdminDashboardPage: NextPage = ({}) => {
  return <AdminLayout></AdminLayout>;
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
    redirect: {
      destination: "/admin/tracks",
    },
  };
};

export default AdminDashboardPage;
