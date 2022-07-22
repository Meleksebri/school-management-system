import { Stack, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import ClassInfo from "../components/ClassInfo";

const Subject = () => {
  const classrom = useSelector((state) => {
    return state?.student?.myClass?.classr;
  });
  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4" gutterBottom style={{ color: "#ff808b" }}>
          {`${classrom?.classesName} Subjects`}
        </Typography>
      </Stack>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
          alignContent: "space-around",
          gap: "40px",
        }}
      >
        {classrom?.subject?.length === 0 ? (
          <h6>No Subjects Yet !</h6>
        ) : (
          classrom?.subject?.map((el) => <ClassInfo subject={el} />)
        )}
      </div>
    </>
  );
};

export default Subject;
