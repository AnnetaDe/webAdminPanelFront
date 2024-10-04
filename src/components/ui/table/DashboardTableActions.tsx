import { Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';

import styles from './DashboardTable.module.scss';
import type { IDashboardTableBaseData } from './dashboard-table.types';

export function DashboardTableActions<TData extends IDashboardTableBaseData>({
  baseRecord,
}: {
  baseRecord: TData;
}) {
  // const { deleteHandler, editUrl } = baseRecord;

  return (
    <>
      {baseRecord.editUrl && (
        <td className={styles.minWidth}>
          <Link href={baseRecord.editUrl} aria-label="Open edit">
            <Edit />
          </Link>
        </td>
      )}
      {baseRecord.deleteHandler && (
        <td className={styles.minWidth}>
          <button onClick={baseRecord.deleteHandler} aria-label="Delete">
            <Trash2 />
          </button>
        </td>
      )}
    </>
  );
}
