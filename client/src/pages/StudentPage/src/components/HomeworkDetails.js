import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";

import Paper from "@mui/material/Paper";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "#1A2027",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const BpIcon = styled("span")(({ theme }) => ({
  borderRadius: "50%",
  width: 16,
  height: 16,
  boxShadow:
    theme.palette.mode === "dark"
      ? "0 0 0 1px rgb(16 22 26 / 40%)"
      : "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
  backgroundColor: theme.palette.mode === "dark" ? "#394b59" : "#f5f8fa",
  backgroundImage:
    theme.palette.mode === "dark"
      ? "linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))"
      : "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
  ".Mui-focusVisible &": {
    outline: "2px auto rgba(19,124,189,.6)",
    outlineOffset: 2,
  },
  "input:hover ~ &": {
    backgroundColor: theme.palette.mode === "dark" ? "#30404d" : "#ebf1f5",
  },
  "input:disabled ~ &": {
    boxShadow: "none",
    background:
      theme.palette.mode === "dark"
        ? "rgba(57,75,89,.5)"
        : "rgba(206,217,224,.5)",
  },
}));

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: "#137cbd",
  backgroundImage:
    "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
  "&:before": {
    display: "block",
    width: 16,
    height: 16,
    backgroundImage: "radial-gradient(#fff,#fff 28%,transparent 32%)",
    content: '""',
  },
  "input:hover ~ &": {
    backgroundColor: "#106ba3",
  },
});

// Inspired by blueprintjs
function BpRadio(props) {
  return (
    <Radio
      sx={{
        "&:hover": {
          bgcolor: "transparent",
        },
      }}
      disableRipple
      color="default"
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      {...props}
    />
  );
}
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function HomeworkDetails() {
  const location = useLocation();
  const homeid = location.state;
  const homeworkList = useSelector((state) => {
    return state?.student?.homeworks?.homeworkList;
  });
  const myhomework = homeworkList?.find((el) => el._id === homeid);

  const [answer, setAnswer] = useState("");
  const handleChange = (event) => {
    setAnswer(event.target.value);
  };
  const [correct, setCorrect] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    console.log(answer);
    if (answer === myhomework?.correct) {
      setCorrect(true);
    } else {
      setCorrect(false);
    }
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4" gutterBottom style={{ color: "#ff808b" }}>
          Homework Details
        </Typography>
      </Stack>

      <Card>
        <CardHeader
          title={"Question"}
          titleTypographyProps={{ variant: "h4" }}
        />
        <br />
        <hr
          style={{
            border: "0px",
            height: "1px",
            background: "#333",
            backgroundiImage:
              "linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0))",
          }}
        />
        <CardContent>
          <Typography variant="h6" style={{ color: "#6B5B95" }}>
            - Description :
          </Typography>
          <Typography variant="subtitle1">{myhomework?.description}</Typography>
          <br />
          <Typography variant="h6" style={{ color: "#6B5B95" }}>
            - Options :
          </Typography>
          <RadioGroup
            name="use-radio-group"
            defaultValue="A"
            onChange={handleChange}
          >
            <Box sx={{ width: "100%" }}>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={6}>
                  <Item>
                    <FormControlLabel
                      value="A"
                      control={<BpRadio />}
                      label={`Option A : ${myhomework?.optionA}`}
                    />
                  </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>
                    <FormControlLabel
                      value="B"
                      control={<BpRadio />}
                      label={`Option B : ${myhomework?.optionB}`}
                    />
                  </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>
                    <FormControlLabel
                      value="C"
                      control={<BpRadio />}
                      label={`Option C : ${myhomework?.optionC}`}
                    />
                  </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>
                    <FormControlLabel
                      value="D"
                      control={<BpRadio />}
                      label={`Option D : ${myhomework?.optionD}`}
                    />
                  </Item>
                </Grid>
              </Grid>
            </Box>
          </RadioGroup>
        </CardContent>
        <Box m={1} display="flex" justifyContent="center" alignItems="center">
          <Button variant="outlined" onClick={handleClick}>
            Check Answer
          </Button>
        </Box>
        <br />
      </Card>

      {correct === true ? (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Good Job ! Your answer is correct
          </Alert>
        </Snackbar>
      ) : correct === false ? (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            Incorrect ! Try again please
          </Alert>
        </Snackbar>
      ) : (
        <></>
      )}
    </>
  );
}
