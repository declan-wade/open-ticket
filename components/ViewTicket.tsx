import React from "react";
import { Descriptions, Timeline, Divider } from "antd";
import type { DescriptionsProps } from "antd";
import { getOneTicket, getActivity } from "@/utils/db";
import moment from "moment";

const ViewTicket: any = (identifier: any) => {
  const [data, setData] = React.useState<any>([]);
  const [activity, setActivity] = React.useState<any>([]);

  async function handleTickets() {
    const payload = await getOneTicket(parseInt(identifier.identifier));
    setData(payload);
    console.log(payload);
  }

  async function handleActivity() {
    const payload = await getActivity(parseInt(identifier.identifier));
    setActivity(payload);
    console.log(payload);
  }

  const formatDateString = (dateString: any) => {
    return moment(dateString).format("YYYY-MM-DD HH:mm:ss");
  };

  (String.prototype as any).toSentenceCase = function () {
    return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
  };

  const items = Object.entries(data).map(([key, value], index) => ({
    key: (index + 1).toString(),
    label: (key as any).toSentenceCase(),
    children: key.includes("date")
      ? formatDateString(value)
      : value === null
      ? "null"
      : value,
  }));



  // Function to transform the array
const transformArray = (array: any) => {
    return array.map((item: any)  => ({
      color: 'red',
      children: (
        <>
          <p>{item.change}</p>
          <p>{item.username === null ? "null" : item.username}</p>
          <p>{moment(item.timestamp).format("YYYY-MM-DD HH:mm:ss")}</p>
        </>
      )
    }));
  };

  const activities = transformArray(activity);

  React.useEffect(() => {
    console.log(identifier.identifier)
    console.log({identifier})
    handleTickets();
    handleActivity();
  }, []);

  return (
    <>
      <Descriptions title={`Ticket #${data.id}`} items={(items as any)} />
      <Divider />
      <h4>Ticket Activity</h4>
      <br></br>
      <Timeline items={activities} />
    </>
  );
};

export default ViewTicket;
