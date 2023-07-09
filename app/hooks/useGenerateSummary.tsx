"use client";

import React from "react";
import axios from "axios";
import { Board } from "@/typing";
import { formatTasks } from "@/utils/formatTasks";

interface Props {
  board: Board;
}

const useGenerateSummary = ({ board }: Props) => {
  const [loading, setLoading] = React.useState(false);
  const [summary, setSummary] = React.useState<string | null>(null);

  const getData = async (board: Board) => {
    // axios
    //   .post("/api/generateSummary", formatTasks(board))
    //   .then((response) => {
    //     console.log(response);
    //     setSummary(JSON.stringify(response));
    //   })
    //   .catch((error) => {
    //     // console.error("error: ", error);
    //   })
    //   .finally(() => {
    //     setLoading(false);
    //   });
    console.log("fetch");
    const tasks = formatTasks(board);
    const res = await fetch("/api/generateSummary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ tasks })
    });
    console.log("res: ", res);
    const data = await res.json();
    const { content } = data;
    if (content) {
      setSummary(content);
    }
    setLoading(false);
    return;
  };

  React.useEffect(() => {
    if (board.columns.size === 0) return;
    setLoading(true);
    if (board.columns.size >= 0) {
      getData(board);
    }
  }, [board]);

  return { loading, summary };
};

export default useGenerateSummary;
