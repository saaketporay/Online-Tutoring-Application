import { Theme } from "@emotion/react";
import { createTheme } from "@mui/material";
import { deepmerge } from "@mui/utils";

function DeepMerge(themes: Theme[]): Theme {
  if (themes.length == 2) {
    return deepmerge(themes[0], themes[1])
  }
  return createTheme(themes[0], DeepMerge(themes.slice(1)))
};

export default DeepMerge;
