import { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import { Article, ArticleStatus } from "../../types/article";
import { getArticlesExtended, putArticleStatus } from "../../services/articleService";
import { Sidebar } from "../../components/navigations/sidebar";
import { cn, dateTimeFormat } from "../../lib/utils";
import { Table, Box, Button, ListItemIcon, MenuItem, TableBody, TableCell, TableHead, TableRow, Typography, Paper, Tooltip, Tabs, Tab } from "@mui/material";
import CustomLoader from "../../components/basic/loader";
import DOMPurify from "dompurify";

export const ArticleList = ({
  data,
  setData,
  isLoading,
}: {
  data: Article[];
  setData: React.Dispatch<React.SetStateAction<Article[]>>;
  isLoading: boolean;
}) => {

  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});
  const [editedArticles, setEditedArticles] = useState<Record<string, Article>>({});

  const handleSave = async () => {
    const updatedArticles = Object.values(editedArticles);
    if (updatedArticles.length) {
      const response = await putArticleStatus(updatedArticles.map(a => ({ articleId: a.articleId, status: a.status })));
      setData((prev) =>
        prev.map((article) => {
          return editedArticles[article.articleId] ? { ...article, status: editedArticles[article.articleId].status } : article
        })
      );
      setEditedArticles({});
      alert("Status updates saved successfully!");
    }
  };

  useEffect(() => console.log(data), [data])

  const columns = useMemo<MRT_ColumnDef<Article>[]>(
    () => [
      {
        accessorKey: 'title',
        header: 'Title',
        size: 200,
        enableEditing: false,
      },
      {
        accessorKey: 'user.userName',
        header: 'User Name',
        size: 150,
        enableEditing: false,
      },
      {
        accessorKey: 'curatorNote',
        header: 'Note',
        enableSorting: false,
        size: 300,
        enableEditing: false,
        Cell: ({ cell }) => {
          const [showMore, setShowMore] = useState(false);
          const note = cell.getValue<string>() || '';
          const limit = 100; // Limit to 50 characters

          return (
            <div>
              {showMore ? note : (note != null && note.length > 0 && note !== "None") ? note.length > limit ? `${note.substring(0, limit)}...` : `${note.substring(0, limit)}` : ''}
              {note.length > limit && (
                <button
                  onClick={() => setShowMore(!showMore)}
                  className="text-blue-500 hover:underline"
                >
                  {showMore ? ' Show less' : ' Show more'}
                </button>
              )}
            </div>
          );
        },
      },
      {
        accessorKey: 'book.isbn',
        header: 'ISBN',
        enableSorting: false,
        size: 50,
        enableClickToCopy: true,
        enableEditing: false,
        Cell: ({ cell }) => {
          const isbn = cell.getValue<string>() || '';

          return (
            <div
              style={{
                whiteSpace: 'normal', // Allows the text to wrap to a new line
                wordBreak: 'break-word', // Breaks long words if necessary
                overflowWrap: 'break-word', // Wraps long content
              }}
            >
              {isbn}
            </div>
          );
        },
      },
      {
        accessorKey: 'image',
        header: 'Image',
        enableSorting: false,
        size: 50,
        enableEditing: false,
        Cell: ({ cell }) => {
          const image = cell.getValue<string>() || '';
          // const [isImageValid, setIsImageValid] = useState(true);

          // useEffect(() => {
          //   const img = new Image();
          //   img.src = image;
          //   img.onload = () => setIsImageValid(true);
          //   img.onerror = () => setIsImageValid(false);
          // }, [image]);

          return (
            <div>
              {
                image ?
                  (<img
                    src={image}
                    className="w-20 max-h-32 min-h-16"
                    onError={() => "Error"}
                  />)
                  : (
                    <span>Không có ảnh</span>
                  )
              }
            </div >
          );
        },
      },
      {
        accessorKey: 'status',
        header: 'Status',
        size: 20,
        enableSorting: false,
        enableColumnOrdering: false,
        enableEditing: true,
        muiTableBodyCellProps: {
          align: 'right',
        },
        editVariant: 'select',
        editSelectOptions: [
          { value: 0, label: 'Draft' },
          { value: 1, label: 'Pending' },
          { value: 2, label: 'Published' },
          { value: 3, label: 'Not Approved' },
          { value: 4, label: 'Archived' },
        ],
        muiEditTextFieldProps: ({ row }) => ({
          select: true,
          error: !!validationErrors?.state,
          helperText: validationErrors?.state,
          onChange: (event) => {
            const newStatus = parseInt(event.target.value);
            setEditedArticles({
              ...editedArticles,
              [row.id]: { ...row.original, status: newStatus },
            });
          },
        }),
        // Cell: ({ cell }) => {
        //   const status = cell.getValue<number>() || 0;
        //   const backgroundColors = [
        //     '#f1c40f', // Draft - Yellow (indicating an uncompleted status)
        //     '#f39c12', // Pending - Orange (waiting to be approved)
        //     '#28a745', // Published - Green (indicating active or published)
        //     '#dc3545', // NotApproved - Red (indicating something that didn’t pass review)
        //     '#6c757d', // Archived - Gray (indicating something stored away or inactive)
        //   ];
        //   return (
        //     <Box
        //       component="span"
        //       sx={(theme) => ({
        //         backgroundColor: backgroundColors[status],
        //         borderRadius: '0.25rem',
        //         color: '#000',
        //         fontWeight: 'bold',
        //         maxWidth: '9ch',
        //         px: '1rem',
        //         py: '0.5rem'
        //       })}
        //     >
        //       {ArticleStatus[status]}
        //     </Box>
        //   )
        //} 
      },
      {
        accessorKey: 'dateCreated',
        header: 'Date Created',
        size: 50,
        enableEditing: false,
        Cell: ({ cell }) => {
          const date = cell.getValue<string>() || '';

          return (
            <div>
              {dateTimeFormat(date)}
            </div>
          );
        },
      },

    ],
    [editedArticles, validationErrors],
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
    enableEditing: true,
    editDisplayMode: 'table',
    enableRowActions: true,
    enableRowSelection: true,
    getRowId: (originalRow) => originalRow.articleId,
    initialState: {
      showColumnFilters: true,
      showGlobalFilter: true,
      columnPinning: {
        left: ['mrt-row-expand', 'mrt-row-select'],
        right: ['mrt-row-actions'],
      },
    },
    paginationDisplayMode: 'pages',
    positionToolbarAlertBanner: 'bottom',
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
    renderDetailPanel: ({ row }) => {
      if (row.original.ideaCards == null || row.original.ideaCards.length == 0) {
        return;
      }
      return (
        <Paper sx={{ padding: 2, maxWidth: '100%', overflowX: 'auto' }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Content</TableCell>
                <TableCell>Image</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {row.original.ideaCards?.map((ideaCard, index) => (
                <TableRow key={index}>
                  <TableCell width={200}>{ideaCard.title}</TableCell>
                  <TableCell width={400}>
                    <Typography
                      component="div"
                      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(ideaCard.content || "") }}
                    />
                  </TableCell>
                  <TableCell width={100}>
                    <Typography variant="body2" color="textSecondary">
                      {ideaCard.image ? (
                        <Tooltip
                          title={
                            <img
                              src={ideaCard.image}
                              alt="Idea Card Preview"
                              style={{ maxWidth: '200px', maxHeight: '200px' }}
                            />
                          }
                          arrow
                          placement="right"
                        >
                          <a href={ideaCard.image} target="_blank" rel="noopener noreferrer">
                            Hover to preview
                          </a>
                        </Tooltip>
                      ) : (
                        "No Image"
                      )}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      );
    },
    renderRowActionMenuItems: ({ row, closeMenu }) => {
      const menuItems = [];
      const moveToPublished =
        <MenuItem
          key="publish"
          onClick={() => {
            putArticleStatus([{ articleId: row.original.articleId, status: ArticleStatus.Published }]);
            closeMenu();
          }}
          sx={{ m: 0 }}
        >
          <ListItemIcon>
          </ListItemIcon>
          Move to Published
        </MenuItem>

      const moveToNotApproved =
        <MenuItem
          key="notApproved"
          onClick={() => {
            putArticleStatus([{ articleId: row.original.articleId, status: ArticleStatus.NotApproved }]);
            closeMenu();
          }}
          sx={{ m: 0 }}
        >
          <ListItemIcon>
          </ListItemIcon>
          Move to Not Approved
        </MenuItem>

      const moveToArchived =
        <MenuItem
          key="archived"
          onClick={() => {
            putArticleStatus([{ articleId: row.original.articleId, status: ArticleStatus.Archived }]);
            closeMenu();
          }}
          sx={{ m: 0 }}
        >
          <ListItemIcon>
          </ListItemIcon>
          Move to Archived
        </MenuItem>

      menuItems.push(
        <MenuItem
          key="view"
          onClick={() => {
            window.open(`/detail/${row.original.articleId}`, "_blank"); // Open in new tab
            closeMenu();
          }}
          sx={{ m: 0 }}
        >
          <ListItemIcon>
            {/* <AccountCircle /> */} {/* Optional icon */}
          </ListItemIcon>
          View Article
        </MenuItem>
      );

      // Conditionally add options based on the current status
      if (row.original.status === ArticleStatus.Pending) {
        menuItems.push(
          moveToPublished,
          moveToNotApproved
        );
      } else if (row.original.status === ArticleStatus.Published) {
        menuItems.push(
          moveToArchived
        );
      } else if (row.original.status === ArticleStatus.NotApproved) {
        menuItems.push(
        );
      } else if (row.original.status === ArticleStatus.Archived) {
        menuItems.push(
          moveToPublished
        );
      }
      return menuItems;
    },
    renderBottomToolbarCustomActions: () => (
      <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Button
          color="success"
          variant="contained"
          onClick={handleSave}
          disabled={
            Object.keys(editedArticles).length === 0 ||
            Object.values(validationErrors).some((error) => !!error)
          }
        >
          Save
          {/* {isUpdatingUsers ? <CircularProgress size={25} /> : 'Save'} */}
        </Button>
        {Object.values(validationErrors).some((error) => !!error) && (
          <Typography color="error">Fix errors before submitting</Typography>
        )}
      </Box>
    ),
    // renderTopToolbar: ({ table }) => {
    //   return (
    //     <Box
    //       sx={(theme) => ({
    //         backgroundColor: lighten(theme.palette.background.default, 0.05),
    //         display: 'flex',
    //         gap: '0.5rem',
    //         p: '8px',
    //         justifyContent: 'space-between',
    //       })}
    //     >
    //       <Box sx={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
    //         {/* import MRT sub-components */}
    //         <MRT_GlobalFilterTextField table={table} />
    //         <MRT_ToggleFiltersButton table={table} />
    //         <MRT_ToggleFullScreenButton table={table} />
    //       </Box>
    //     </Box>
    //   );
    // },
  });

  return (
    <div className="overflow-y-auto w-[90vw] ">
      {
        isLoading ? <CustomLoader className="fixed top-1/2 left-1/2" /> : <MaterialReactTable table={table} />
      }
    </div>
  )
}




export function ArticleAdminPage() {
  const [selectedTab, setSelectedTab] = useState(1); // Default to Pending tab
  const [data, setData] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [filteredData, setFilteredData] = useState<Article[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const articles = await getArticlesExtended();
      setData(articles);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    // console.log(data)
    const newFilteredData = data.filter(article => {
      if (selectedTab === 1) return article.status === ArticleStatus.Pending;
      if (selectedTab === 2) return article.status === ArticleStatus.Published;
      if (selectedTab === 3) return article.status === ArticleStatus.NotApproved;
      if (selectedTab === 4) return article.status === ArticleStatus.Archived;
      return true;
    });
    setFilteredData(newFilteredData);
  }, [data, selectedTab]);



  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700",
        "h-screen w-screen" // Adjust to "h-screen" if needed for full height
      )}
    >
      <Sidebar open={open} setOpen={setOpen} animate={true} />
      <Box>
        <Tabs
          value={selectedTab}
          onChange={(e, newValue) => setSelectedTab(newValue)}
          aria-label="Article status tabs"
        >
          <Tab label="Pending" value={1} />
          <Tab label="Published" value={2} />
          <Tab label="Not Approved" value={3} />
          <Tab label="Archived" value={4} />
        </Tabs>

        <ArticleList data={filteredData} setData={setData} isLoading={isLoading} />
      </Box>
      {/* <ArticleList /> */}
    </div>
  );
}

