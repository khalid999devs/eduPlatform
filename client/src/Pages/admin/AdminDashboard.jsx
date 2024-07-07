import { useOutletContext } from 'react-router-dom';
import Chart from 'chart.js/auto';
import { defaults } from 'chart.js/auto';
import { Bar, Line } from 'react-chartjs-2';
import RoundedRiseAnime from '../../Components/Utils/RoundedRiseAnime';
import { useEffect, useState } from 'react';
import axios from 'axios';
import reqs from '../../assets/requests';

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = 'center';
defaults.plugins.title.font.size = 16;
defaults.plugins.title.color = '#3A1500';

const commonCSS = `rounded-lg shadow-lg p-4 w-full`;

const AdminDashboard = () => {
  const [isAdmin] = useOutletContext();
  const [analytics, setAnalytics] = useState({});

  useEffect(() => {
    axios
      .get(reqs.GET_DASHBOARD_ANALYTICS, { withCredentials: true })
      .then((res) => {
        if (res.data.succeed) {
          setAnalytics(res.data.result);
        }
      })
      .catch((err) => {
        alert(err.response.data.msg);
      });
  }, []);

  if (isAdmin)
    return (
      <div className='dashboard-container'>
        <div className={`${commonCSS}`} style={{ gridArea: 'd1' }}>
          <Line
            datasetIdKey='id1'
            data={{
              labels: analytics?.last12MonthPurchase?.labels,
              datasets: [
                {
                  id: 1,
                  label: 'Purchases',
                  data: analytics?.last12MonthPurchase?.registrations,
                  backgroundColor: '#FFD700',
                },
              ],
            }}
            options={{
              elements: { line: { tension: 0.2 } },
              plugins: { title: { text: 'Monthly Course Purchases' } },
            }}
          />
        </div>
        <div className={`${commonCSS}`} style={{ gridArea: 'd2' }}>
          <Bar
            datasetIdKey='id2'
            data={{
              labels: analytics?.courseBasedPurchase?.labels,
              datasets: [
                {
                  id: 1,
                  label: 'Purchases',
                  data: analytics?.courseBasedPurchase?.data,
                  backgroundColor: ['#005246', '#FFD700', '#B5A26D'],
                  borderRadius: 5,
                },
              ],
            }}
            options={{
              plugins: { title: { text: 'Course Based Purchases' } },
            }}
          />
        </div>
        <div
          className={`${commonCSS} grid grid-cols-1 md:grid-cols-[1.5fr,1fr] gap-2 place-items-center`}
          style={{ gridArea: 'd3' }}
        >
          <div>
            {
              <RoundedRiseAnime
                totalNumber={analytics?.otherCountData?.allPurchaseCount}
                label={'Course purchases'}
              />
            }
          </div>
          <div className='flex flex-col items-start justify-center gap-2'>
            <h3 className='text-tertiary-main'>
              <span className='font-bold text-secondary-dark text-lg'>
                {analytics?.otherCountData?.StudentsCount}+
              </span>{' '}
              Students
            </h3>
            <h3 className='text-tertiary-main'>
              <span className='font-bold text-secondary-dark text-lg'>
                {analytics?.otherCountData?.allCoursesCount}+
              </span>{' '}
              Courses
            </h3>
          </div>
        </div>
      </div>
    );
};

export default AdminDashboard;
