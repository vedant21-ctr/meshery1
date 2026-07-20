import React from 'react';
import {
  CustomColumnVisibilityControl,
  SearchBar,
  UniversalFilter,
  DataTableToolbar,
} from '@sistent/sistent';
import { Publish as PublishIcon } from '@/assets/icons';
import ViewSwitch from '../../ViewSwitch';
import CAN from '@/utils/can';
import { Keys } from '@meshery/schemas/permissions';
import TooltipButton from '@/utils/TooltipButton';
import { AddIconStyled, BtnText } from './MesheryPatterns.styled';

/**
 * Header toolbar for the Designs page.
 *
 * Extracted from MesheryPatterns.tsx mechanically — same DOM tree, same
 * behavior. The parent supplies every callback / piece of state via props.
 */
function MesheryPatternsToolbar({
  width,
  isSearchExpanded,
  setIsSearchExpanded,
  selectedPattern,
  patterns,
  viewType,
  setViewType,
  disableCreateImportDesignButton,
  disableUniversalFilter,
  pageTitle,
  router,
  handleUploadImport,
  setSearch,
  filter,
  selectedFilters,
  setSelectedFilters,
  handleApplyFilter,
  columns,
  columnVisibility,
  setColumnVisibility,
}) {
  return (
    <DataTableToolbar
      primaryActions={
        width < 600 && isSearchExpanded ? null : !selectedPattern.show &&
          (patterns.length >= 0 || viewType === 'table') &&
          !disableCreateImportDesignButton ? (
          <div style={{ display: 'flex' }}>
            <TooltipButton
              title="Create Design"
              data-testid="meshery-patterns-create-design-btn"
              aria-label="Add Pattern"
              variant="contained"
              color="primary"
              size="large"
              // @ts-ignore
              onClick={() => router.push('designs/configurator')}
              style={{ display: 'flex', marginRight: '2rem' }}
              disabled={
                !CAN(
                  Keys.CatalogManagementCreateNewDesign.id,
                  Keys.CatalogManagementCreateNewDesign.function,
                )
              }
            >
              <AddIconStyled />
              <BtnText> Create Design </BtnText>
            </TooltipButton>
            <TooltipButton
              title="Import Design"
              data-testid="meshery-patterns-import-design-btn"
              aria-label="Add Pattern"
              variant="contained"
              color="primary"
              size="large"
              // @ts-ignore
              onClick={handleUploadImport}
              style={{ display: 'flex', marginRight: '2rem', marginLeft: '-0.6rem' }}
              disabled={
                !CAN(
                  Keys.CatalogManagementImportDesign.id,
                  Keys.CatalogManagementImportDesign.function,
                )
              }
            >
              <AddIconStyled>
                <PublishIcon />
              </AddIconStyled>
              <BtnText> Import Design </BtnText>
            </TooltipButton>
          </div>
        ) : null
      }
      search={
        <SearchBar
          onSearch={(value) => {
            setSearch(value);
          }}
          expanded={isSearchExpanded}
          setExpanded={setIsSearchExpanded}
          placeholder={`Search ${pageTitle.toLowerCase()}...`}
          data-testid="meshery-patterns-search-bar"
        />
      }
      filter={
        !disableUniversalFilter ? (
          <UniversalFilter
            id="ref"
            filters={filter}
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
            handleApplyFilter={handleApplyFilter}
            data-testid="meshery-patterns-universal-filter"
          />
        ) : null
      }
      columnVisibility={
        viewType === 'table' ? (
          <CustomColumnVisibilityControl
            data-testid="meshery-patterns-column-visibility-control"
            id="ref"
            columns={columns}
            customToolsProps={{ columnVisibility, setColumnVisibility }}
          />
        ) : null
      }
      viewSwitch={
        !selectedPattern.show ? <ViewSwitch view={viewType} changeView={setViewType} /> : null
      }
    />
  );
}

export default MesheryPatternsToolbar;
