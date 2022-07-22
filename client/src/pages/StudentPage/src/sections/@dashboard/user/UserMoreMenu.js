import { useRef, useState } from "react";
import { Link, Link as RouterLink } from "react-router-dom";
// material
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
// component
import Iconify from "../../../components/Iconify";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getNoApprovedUsers } from "../../../../../../slices/adminSlice";

// ----------------------------------------------------------------------

export default function UserMoreMenu({ id }) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: "100%" },
        }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Link
          to={`/studentDashboard/details/${id}`}
          state={id}
          style={{ textDecoration: "none" }}
        >
          <MenuItem sx={{ color: "text.secondary" }}>
            <ListItemIcon>
              <Iconify icon="carbon:view" width={24} height={24} />
            </ListItemIcon>
            <ListItemText
              primary="View Details"
              primaryTypographyProps={{ variant: "body2" }}
            />
          </MenuItem>
        </Link>
      </Menu>
    </>
  );
}
