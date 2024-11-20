"use client";

/**
 * External dependencies.
 */
import {
  IconButton,
  SpeedDial,
  SpeedDialHandler,
  SpeedDialContent,
  SpeedDialAction,
  Typography,
} from "@material-tailwind/react";
import {
  PlusIcon,
  ArrowPathIcon,
  DocumentTextIcon,
  TableCellsIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

const DefaultSpeedDial = ({ currentPage, setCurrentPage, resetApp }) => {
  const labelProps = {
    variant: "small",
    color: "blue-gray",
    className:
      "absolute top-2/4 -left-2/4 -translate-y-2/4 -translate-x-3/4 font-normal text-nowrap",
  };

  return (
    <div className="absolute bottom-4 right-4">
      <SpeedDial>
          <SpeedDialHandler>
            <IconButton size="lg" className="rounded-full">
              <PlusIcon className="h-5 w-5 transition-transform group-hover:rotate-45" />
            </IconButton>
          </SpeedDialHandler>

          <SpeedDialContent>

            <SpeedDialAction className="relative" onClick={() => setCurrentPage('form')}>
              <MagnifyingGlassIcon className="h-5 w-5" />
              <Typography {...labelProps}>
                <span className={currentPage==="form" ? "text-blue-400" : ""}>Search Page</span>
              </Typography>
            </SpeedDialAction>

            <SpeedDialAction className="relative" onClick={() => setCurrentPage('profiles')}>
              <TableCellsIcon className="h-5 w-5" />
              <Typography {...labelProps}>
                <span className={currentPage==="profiles" ? "text-blue-400" : ""}>Profiles Page</span>
              </Typography>
            </SpeedDialAction>

            <SpeedDialAction className="relative" onClick={() => setCurrentPage('summary')}>
              <DocumentTextIcon className="h-5 w-5" />
              <Typography {...labelProps}>
                <span className={currentPage==="summary" ? "text-blue-400" : ""}>Summary Page</span>
              </Typography>
            </SpeedDialAction>

            <SpeedDialAction className="relative" onClick={resetApp}>
              <ArrowPathIcon className="h-5 w-5" />
              <Typography {...labelProps}>Reset</Typography>
            </SpeedDialAction>

          </SpeedDialContent>
        </SpeedDial>
    </div>
  );
}

export default DefaultSpeedDial;