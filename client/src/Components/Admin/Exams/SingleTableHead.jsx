const SingleTableHead = ({ title }) => (
  <th
    scope='col'
    className='text-xs font-medium text-primary-main px-3 py-2 text-left'
  >
    {title || 'thead'}
  </th>
);

export default SingleTableHead;
