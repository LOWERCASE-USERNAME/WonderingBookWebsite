import { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import { Box, ListItemIcon, MenuItem, Tabs, Tab } from "@mui/material";
import CustomLoader from "../../components/basic/loader";
import { getAllUser, putUserStatus } from "../../services/authService";
import { User, UserStatus } from "../../types/user";

export const UserList = ({
  data,
  setData,
  isLoading,
}: {
  data: User[];
  setData: React.Dispatch<React.SetStateAction<User[]>>;
  isLoading: boolean;
}) => {

  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});
  const [editedUsers, setEditedUsers] = useState<Record<string, User>>({});

  // const handleSave = async () => {
  //   const updatedUsers = Object.values(editedUsers);
  //   if (updatedUsers.length) {
  //     const response = await putArticleStatus(updatedUsers.map(a => ({ articleId: a.articleId, status: a.status })));
  //     setData((prev) =>
  //       prev.map((article) => {
  //         return editedUsers[article.articleId] ? { ...article, status: editedUsers[article.articleId].status } : article
  //       })
  //     );
  //     setEditedUsers({});
  //     alert("Status updates saved successfully!");
  //   }
  // };

  const columns = useMemo<MRT_ColumnDef<User>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'Id',
        size: 200,
        enableClickToCopy: true,
      },
      {
        accessorKey: 'fullname',
        header: 'Full name',
        size: 200,
      },
      {
        accessorKey: 'email',
        header: 'Email',
        size: 300,
        enableClickToCopy: true,
      },
      {
        accessorKey: 'userName',
        header: 'Username',
        size: 150,
        enableClickToCopy: true,
      },
      {
        accessorKey: 'status',
        header: 'Status',
        size: 20,
        muiTableBodyCellProps: {
          align: 'right',
        },
        accessorFn: (row) => UserStatus[row.status ?? 0]
      },
      {
        accessorKey: 'roles',
        header: 'Role',
        size: 150,
      },
    ],
    [editedUsers, validationErrors],
  );

  const table = useMaterialReactTable({
    columns,
    data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    // enableColumnFilterModes: true,
    enableColumnOrdering: true,
    enableStickyHeader: true,
    // enableGrouping: true,
    // enableColumnPinning: true,
    // enableFacetedValues: true,
    // enableEditing: true,
    // editDisplayMode: 'table',
    enableRowActions: true,
    enableRowSelection: true,
    getRowId: (originalRow) => originalRow.id,
    initialState: {
      showColumnFilters: true,
      showGlobalFilter: true,
      columnPinning: {
        // left: ['mrt-row-expand', 'mrt-row-select'],
        right: ['mrt-row-actions'],
      },
    },
    paginationDisplayMode: 'pages',
    // positionToolbarAlertBanner: 'bottom',
    muiSearchTextFieldProps: {
      size: 'small',
      variant: 'outlined',
    },
    muiPaginationProps: {
      color: 'secondary',
      rowsPerPageOptions: [10, 20, 30],
      shape: 'rounded',
      variant: 'outlined',
    },
    renderRowActionMenuItems: ({ row, closeMenu }) => {
      const menuItems = [];
      const moveToBanned =
        <MenuItem
          key="banned"
          onClick={() => {
            console.log(row.original.id)
            putUserStatus(row.original.id, UserStatus.Banned);
            setData((prev) =>
              prev.map((user) => {
                return user.id == row.original.id ? { ...user, status: UserStatus.Banned } : user
              })
            );
            closeMenu();
          }}
          sx={{ m: 0 }}
        >
          <ListItemIcon>
          </ListItemIcon>
          Move to Banned
        </MenuItem>

      const moveToActive =
        <MenuItem
          key="active"
          onClick={() => {
            putUserStatus(row.original.id, UserStatus.Active);
            setData((prev) =>
              prev.map((user) => {
                return user.id == row.original.id ? { ...user, status: UserStatus.Active } : user
              })
            );
            closeMenu();
          }}
          sx={{ m: 0 }}
        >
          <ListItemIcon>
          </ListItemIcon>
          Move to Not Approved
        </MenuItem>

      // Conditionally add options based on the current status
      if (row.original.status === UserStatus.Active) {
        menuItems.push(
          moveToBanned,
        );
      } else if (row.original.status === UserStatus.Banned) {
        menuItems.push(
          moveToActive
        );
      }
      return menuItems;
    },
  });

  return (
    <div className="overflow-y-auto ">
      {
        isLoading ? <CustomLoader className="fixed top-1/2 left-1/2" /> : <MaterialReactTable table={table} />
      }
    </div>
  )
}




export function UserAdminPage() {
  const [selectedTab, setSelectedTab] = useState(0); // Default to Active tab
  const [data, setData] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredData, setFilteredData] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const users = await getAllUser();
      setData(users);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    // console.log(data)
    const newFilteredData = data.filter(user => {
      if (selectedTab === 0) return user.status === UserStatus.Active;
      if (selectedTab === 1) return user.status === UserStatus.Banned;
      return true;
    });
    setFilteredData(newFilteredData);
  }, [data, selectedTab]);

  return (
    <Box sx={{ width: '90vw' }}>
      <Tabs
        value={selectedTab}
        onChange={(e, newValue) => setSelectedTab(newValue)}
        aria-label="User status tabs"
      >
        <Tab label="Active" value={0} />
        <Tab label="Banned" value={1} />
      </Tabs>

      <UserList data={filteredData} setData={setData} isLoading={isLoading} />
    </Box>
  );
}

