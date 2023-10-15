import Image from 'next/image'
import styles from './page.module.css'
import Link from 'next/link'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.subContainer}>

      <Link href={'/daril'} className={styles.link}>
        <Image src={'/person.svg'} alt='avatar-person' width={120} height={120} />
        <p>Daril Insan Kamil</p>
      </Link>
      <Link href={'/rafly'} className={styles.link}>
        <Image src={'/person.svg'} alt='avatar-person' width={120} height={120} />
        <p>Rafly Putra Afandi</p>
      </Link>
      <Link href={'/liwa'} className={styles.link}>
        <Image src={'/person.svg'} alt='avatar-person' width={120} height={120} />
        <p>Suliwa Yudha Adinata</p>
      </Link>
      </div>

    </main>
  )
}
