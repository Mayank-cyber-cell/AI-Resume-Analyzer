import React from 'react'
import styles from './admin.module.css'
import { Skeleton } from '@mui/material'
import { withAUTHHOC } from '../../utils/HOC/withAUTHHOC';
const admin = () => {
  return (
    <div className={styles.Admin}>
      <div className={styles.AdminBlock}>
        <Skeleton
          variant="rectangular"
          width={210}
          height={450}
          sx={{ borderRadius: '20px' }} />
        <div className={styles.AdminCard}>
          <h2>Mayank shah</h2>
          <p style={{ color: "blue" }}>Jimayank2105@gmail.com</p>
          <h3>Score: 77%</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos enim non explicabo tempora assumenda vitae odit recusandae. Aliquid fuga libero ducimus atque eum assumenda ea sapiente consequatur numquam sint magni dolor consequuntur, facere inventore debitis temporibus magnam accusantium repellat veniam, rerum incidunt fugiat tempore. Odio vitae provident delectus atque dolore, dolor a magni cumque ipsam sint obcaecati, esse accusantium!</p>
        </div>

        <div className={styles.AdminCard}>
          <h2>Mayank shah</h2>
          <p style={{ color: "blue" }}>Jimayank2105@gmail.com</p>
          <h3>Score: 77%</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos enim non explicabo tempora assumenda vitae odit recusandae. Aliquid fuga libero ducimus atque eum assumenda ea sapiente consequatur numquam sint magni dolor consequuntur, facere inventore debitis temporibus magnam accusantium repellat veniam, rerum incidunt fugiat tempore. Odio vitae provident delectus atque dolore, dolor a magni cumque ipsam sint obcaecati, esse accusantium!</p>
        </div>

        <div className={styles.AdminCard}>
          <h2>Mayank shah</h2>
          <p style={{ color: "blue" }}>Jimayank2105@gmail.com</p>
          <h3>Score: 77%</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos enim non explicabo tempora assumenda vitae odit recusandae. Aliquid fuga libero ducimus atque eum assumenda ea sapiente consequatur numquam sint magni dolor consequuntur, facere inventore debitis temporibus magnam accusantium repellat veniam, rerum incidunt fugiat tempore. Odio vitae provident delectus atque dolore, dolor a magni cumque ipsam sint obcaecati, esse accusantium!</p>
        </div>

        <div className={styles.AdminCard}>
          <h2>Mayank shah</h2>
          <p style={{ color: "blue" }}>Jimayank2105@gmail.com</p>
          <h3>Score: 77%</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos enim non explicabo tempora assumenda vitae odit recusandae. Aliquid fuga libero ducimus atque eum assumenda ea sapiente consequatur numquam sint magni dolor consequuntur, facere inventore debitis temporibus magnam accusantium repellat veniam, rerum incidunt fugiat tempore. Odio vitae provident delectus atque dolore, dolor a magni cumque ipsam sint obcaecati, esse accusantium!</p>
        </div>

        <div className={styles.AdminCard}>
          <h2>Mayank shah</h2>
          <p style={{ color: "blue" }}>Jimayank2105@gmail.com</p>
          <h3>Score: 77%</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos enim non explicabo tempora assumenda vitae odit recusandae. Aliquid fuga libero ducimus atque eum assumenda ea sapiente consequatur numquam sint magni dolor consequuntur, facere inventore debitis temporibus magnam accusantium repellat veniam, rerum incidunt fugiat tempore. Odio vitae provident delectus atque dolore, dolor a magni cumque ipsam sint obcaecati, esse accusantium!</p>
        </div>

        <div className={styles.AdminCard}>
          <h2>Mayank shah</h2>
          <p style={{ color: "blue" }}>Jimayank2105@gmail.com</p>
          <h3>Score: 77%</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos enim non explicabo tempora assumenda vitae odit recusandae. Aliquid fuga libero ducimus atque eum assumenda ea sapiente consequatur numquam sint magni dolor consequuntur, facere inventore debitis temporibus magnam accusantium repellat veniam, rerum incidunt fugiat tempore. Odio vitae provident delectus atque dolore, dolor a magni cumque ipsam sint obcaecati, esse accusantium!</p>
        </div>

        <div className={styles.AdminCard}>
          <h2>Mayank shah</h2>
          <p style={{ color: "blue" }}>Jimayank2105@gmail.com</p>
          <h3>Score: 77%</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos enim non explicabo tempora assumenda vitae odit recusandae. Aliquid fuga libero ducimus atque eum assumenda ea sapiente consequatur numquam sint magni dolor consequuntur, facere inventore debitis temporibus magnam accusantium repellat veniam, rerum incidunt fugiat tempore. Odio vitae provident delectus atque dolore, dolor a magni cumque ipsam sint obcaecati, esse accusantium!</p>
        </div>


      </div>
    </div>
  )
}

export default withAUTHHOC(admin)
