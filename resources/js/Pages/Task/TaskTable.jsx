import TableHeading from "@/Components/TableHeading";
import { Link, router } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/constants.jsx";

export default function TaskTable({tasks,queryparams = null, hideProjectColumn = false}){

  queryparams = queryparams || {}

  const searchFieldChanged = (name,value) => {
    if(value){
      queryparams[name] = value
    }else{
      delete queryparams[name]
    }

    router.get(route('task.index'), queryparams)
  }

  const onKeyPress = (name,e) => {
    if(e.key !== 'Enter') return;

    searchFieldChanged(name, e.target.value);
  }

  const sortChange = (name) =>{
    if(name === queryparams.sort_field){
      if(queryparams.sort_direction === 'asc'){
        queryparams.sort_direction = 'desc'
      }else{
        queryparams.sort_direction = 'asc'
      }
    }else{
      queryparams.sort_field = name
      queryparams.sort_direction = 'asc'
    }

    router.get(route('task.index'), queryparams)
  }

  return(
    <>
      <div className="overflow-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
            <tr className="text-nowrap">
              <TableHeading
                name="id"
                sort_field={queryparams.sort_field}
                sort_direction={queryparams.sort_direction}
                sortChange={sortChange}
              >ID</TableHeading>
              <th className="px-3 py-3">Image</th>
              {!hideProjectColumn && (
                <th className="px-3 py-3">Project Name</th>
              )}
              <TableHeading
                name="name"
                sort_field={queryparams.sort_field}
                sort_direction={queryparams.sort_direction}
                sortChange={sortChange}
              >Name</TableHeading>
              <TableHeading
                name="status"
                sort_field={queryparams.sort_field}
                sort_direction={queryparams.sort_direction}
                sortChange={sortChange}
              >Status</TableHeading>
              <TableHeading
                name="created_at"
                sort_field={queryparams.sort_field}
                sort_direction={queryparams.sort_direction}
                sortChange={sortChange}
              >Create Date</TableHeading>
              <TableHeading
                name="due_date"
                sort_field={queryparams.sort_field}
                sort_direction={queryparams.sort_direction}
                sortChange={sortChange}
              >Due Date</TableHeading>
              <th className="px-3 py-3">Created By</th>
              <th className="px-3 py-3">Actions</th>
            </tr>
          </thead>
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
            <tr className="text-nowrap">
              <th className="px-3 py-3"></th>
              <th className="px-3 py-3"></th>
              {!hideProjectColumn && (<th className="px-3 py-3"></th>)}
              <th className="px-3 py-3">
                <TextInput className="w-full"
                  defaultValue={queryparams.name}
                  placeholder="Task Name"
                  onBlur={e => searchFieldChanged('name', e.target.value)}
                  onKeyPress={e =>onKeyPress('name',e)}
                />
              </th>
              <th className="px-3 py-3">
                <SelectInput className="w-full" defaultValue={queryparams.status} onChange={e =>searchFieldChanged("status", e.target.value)}>
                  <option value="">Select Status</option>
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </SelectInput>
              </th>
              <th className="px-3 py-3"></th>
              <th className="px-3 py-3"></th>
              <th className="px-3 py-3"></th>
              <th className="px-3 py-3"></th>
            </tr>
          </thead>
          <tbody>
          {/* <pre>{JSON.stringify(tasks,undefined,2)}</pre> */}
            {tasks.data.map((task) => (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={task.id}>
                <td className="px-3 py-2">{task.id}</td>
                <td className="px-3 py-2">
                  <img src={task.image_path} alt="" style={{ width:60 }} />
                </td>
                {!hideProjectColumn && (<td className="px-3 py-2">{task.project.name}</td>)}
                <td className="px-3 py-2">{task.name}</td>
                <td className="px-3 py-2">
                  <span className={"px-2 py-1 rounded text-white " + TASK_STATUS_CLASS_MAP[task.status]}>
                    {TASK_STATUS_TEXT_MAP[task.status]}
                  </span>
                </td>
                <td className="px-3 py-2">{task.created_at}</td>
                <td className="px-3 py-2">{task.due_date}</td>
                <td className="px-3 py-2">{task.createdBy.name}</td>
                <td className="px-3 py-2">
                  <Link href={route('task.edit',task.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1">
                    Edit
                  </Link>
                  <Link href={route('task.destroy',task.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1">
                    Delete
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination links={tasks.meta.links} />
    </>
  )
}
