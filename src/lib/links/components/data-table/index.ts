import Actions from './actions.svelte'

import Root from './data-table.svelte'
import Content from './table-content.svelte'

export default Root

export {
  Root,
  Content,
  Actions,
  //
  Root as DataTable,
  Content as DataTableContent,
  Actions as DataTableActions
}
