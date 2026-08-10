import React from 'react'
import styles from './history.module.css'
import { Skeleton } from '@mui/material'
import { withAUTHHOC } from '../../utils/HOC/withAUTHHOC';
function History() {
  return (
    <div className={styles.history}>
      <div className={styles.HistoryCardBlock}>

        <Skeleton
          variant="rectangular"
          width={210}
          height={444}
          sx={{ borderRadius: '20px' }} />
        <div className={styles.HistoryCard}>
          <div className={styles.CardPercentage}>
            88%
          </div>
          <h2>Frontend Development</h2>
          <p>Resume Name : Resume.pdf</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut ad maiores consequatur vero dicta! Aspernatur, ducimus culpa? Odit, amet ullam. Consequatur vitae dolor obcaecati dolores doloremque soluta? Autem quasi nostrum aliquam fuga debitis incidunt et quidem harum? Ipsam at, illum fugiat autem fuga repudiandae, perferendis aperiam illo doloremque nemo nulla eum rem, doloribus assumenda dolorum eos voluptatum ipsum odit?</p>
          <p>Dated :2069-01-01</p>
        </div>

        <div className={styles.HistoryCard}>
          <div className={styles.CardPercentage}>
            88%
          </div>
          <h2>Frontend Development</h2>
          <p>Resume Name : Resume.pdf</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut ad maiores consequatur vero dicta! Aspernatur, ducimus culpa? Odit, amet ullam. Consequatur vitae dolor obcaecati dolores doloremque soluta? Autem quasi nostrum aliquam fuga debitis incidunt et quidem harum? Ipsam at, illum fugiat autem fuga repudiandae, perferendis aperiam illo doloremque nemo nulla eum rem, doloribus assumenda dolorum eos voluptatum ipsum odit?</p>
          <p>Dated :2069-01-01</p>
        </div>

        <div className={styles.HistoryCard}>
          <div className={styles.CardPercentage}>
            88%
          </div>
          <h2>Frontend Development</h2>
          <p>Resume Name : Resume.pdf</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut ad maiores consequatur vero dicta! Aspernatur, ducimus culpa? Odit, amet ullam. Consequatur vitae dolor obcaecati dolores doloremque soluta? Autem quasi nostrum aliquam fuga debitis incidunt et quidem harum? Ipsam at, illum fugiat autem fuga repudiandae, perferendis aperiam illo doloremque nemo nulla eum rem, doloribus assumenda dolorum eos voluptatum ipsum odit?</p>
          <p>Dated :2069-01-01</p>
        </div>

        <div className={styles.HistoryCard}>
          <div className={styles.CardPercentage}>
            88%
          </div>
          <h2>Frontend Development</h2>
          <p>Resume Name : Resume.pdf</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut ad maiores consequatur vero dicta! Aspernatur, ducimus culpa? Odit, amet ullam. Consequatur vitae dolor obcaecati dolores doloremque soluta? Autem quasi nostrum aliquam fuga debitis incidunt et quidem harum? Ipsam at, illum fugiat autem fuga repudiandae, perferendis aperiam illo doloremque nemo nulla eum rem, doloribus assumenda dolorum eos voluptatum ipsum odit?</p>
          <p>Dated :2069-01-01</p>
        </div>

        <div className={styles.HistoryCard}>
          <div className={styles.CardPercentage}>
            88%
          </div>
          <h2>Frontend Development</h2>
          <p>Resume Name : Resume.pdf</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut ad maiores consequatur vero dicta! Aspernatur, ducimus culpa? Odit, amet ullam. Consequatur vitae dolor obcaecati dolores doloremque soluta? Autem quasi nostrum aliquam fuga debitis incidunt et quidem harum? Ipsam at, illum fugiat autem fuga repudiandae, perferendis aperiam illo doloremque nemo nulla eum rem, doloribus assumenda dolorum eos voluptatum ipsum odit?</p>
          <p>Dated :2069-01-01</p>
        </div>

        <div className={styles.HistoryCard}>
          <div className={styles.CardPercentage}>
            88%
          </div>
          <h2>Frontend Development</h2>
          <p>Resume Name : Resume.pdf</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut ad maiores consequatur vero dicta! Aspernatur, ducimus culpa? Odit, amet ullam. Consequatur vitae dolor obcaecati dolores doloremque soluta? Autem quasi nostrum aliquam fuga debitis incidunt et quidem harum? Ipsam at, illum fugiat autem fuga repudiandae, perferendis aperiam illo doloremque nemo nulla eum rem, doloribus assumenda dolorum eos voluptatum ipsum odit?</p>
          <p>Dated :2069-01-01</p>
        </div>

        <div className={styles.HistoryCard}>
          <div className={styles.CardPercentage}>
            88%
          </div>
          <h2>Frontend Development</h2>
          <p>Resume Name : Resume.pdf</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut ad maiores consequatur vero dicta! Aspernatur, ducimus culpa? Odit, amet ullam. Consequatur vitae dolor obcaecati dolores doloremque soluta? Autem quasi nostrum aliquam fuga debitis incidunt et quidem harum? Ipsam at, illum fugiat autem fuga repudiandae, perferendis aperiam illo doloremque nemo nulla eum rem, doloribus assumenda dolorum eos voluptatum ipsum odit?</p>
          <p>Dated :2069-01-01</p>
        </div>

      </div>

    </div>
  )
}

export default withAUTHHOC(History)
