import MainContainer from "../components/MainContainer";
import { User } from "../users";
import Script from 'next/script'
import { useEffect, useState } from "react";
import Link from "next/link";

type Props = {
  users: {
    results: User[]
  }
}

const Users:React.FC<Props> = ({ users }) => {
  const [sortBy, setSortBy] = useState<string | null>(null)
  const [sortDesk, setSortDesk] = useState<boolean>(false)
  const [query, setQuery] = useState<string>('')
  const [selectedCountry, setSelectedCountry] = useState<string>('')
  const [selectedGender, setSelectedGender] = useState<string>('')

  let visibleUsers = [...users.results]
  const countries = [];

  visibleUsers.forEach(user => {
    if (!countries.find(el => el === user.location.country)) {
      countries.push(user.location.country)
    }
  })

  const tableHeadItem = (title: string) => {
    if (sortBy === title) {
      if (sortDesk) {
        return <div className="fas fa-caret-square-up" />;
      }

      return <div className="fas fa-caret-square-down" />;
    }

    return <div className="far fa-caret-square-down" />;
  }

  const setSort = (title: string) => {
    if (sortBy !== title) {
      setSortBy(title)
      setSortDesk(false)
      return
    }

    if (!sortDesk) {
      setSortDesk(true)
      return
    }

    setSortBy(null)
    setSortDesk(false)
  }

  if (sortBy) {
    visibleUsers.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.first.localeCompare(b.name.first)

        case 'country':
          return a.location.country.localeCompare(b.location.country)

        case 'email':
        case 'gender':
          return a[sortBy].localeCompare(b[sortBy])
      }
    })
  }

  if (sortDesk) {
    visibleUsers.reverse()
  }

  if (query) {
    const lowerQury = query.toLowerCase();

    visibleUsers = visibleUsers.filter(
      user => user.name.first.toLowerCase().includes(lowerQury)
      || user.name.last.toLowerCase().includes(lowerQury)
    );
  }

  if (selectedCountry) {
    visibleUsers = visibleUsers.filter(
      user => user.location.country === selectedCountry
    )
  }

  if (selectedGender) {
    visibleUsers = visibleUsers.filter(
      user => user.gender === selectedGender
    )
  }

  return (
    <>
      <MainContainer>
        <div className="container">
          <h1>Users</h1>

          <div className="d-flex flex-row">
            <label>
              {'Name '}
              <input type="text" onChange={(e) => setQuery(e.target.value)} />
            </label>

            <select value={selectedGender} onChange={(e) => setSelectedGender(e.target.value)}>
              <option value="">Choose gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}>
              <option value="">Choose country</option>

              {countries.map((el: string) => (
                <option key={el} value={el}>
                  {el[0].toUpperCase() + el.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <table className="table table-striped">
            <thead>
              <tr>
                <th onClick={() => setSort('name')}>
                  {'Name '}
                  {tableHeadItem('name')}
                </th>

                <th onClick={() => setSort('email')}>
                  {'Email '}
                  {tableHeadItem('email')}
                </th>

                <th onClick={() => setSort('gender')}>
                  {'Gender '}
                  {tableHeadItem('gender')}
                </th>

                <th onClick={() => setSort('country')}>
                  {'Country '}
                  {tableHeadItem('country')}
                </th>
              </tr>
            </thead>
            <tbody>
            {visibleUsers.map((user: User) =>
                <tr key={user.id.value || user.email}>
                  <td onClick={() => localStorage.setItem('user', JSON.stringify(user))}>
                    <Link href={`/users/${user.id.value}`}>
                      {`${user.name.first} ${user.name.last}`}
                    </Link>
                  </td>
                  <td>{user.email}</td>
                  <td>{user.gender}</td>
                  <td>{user.location.country}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </MainContainer>

      <Script src="https://kit.fontawesome.com/b7004ac0da.js" />

      <style>
        {`
          th:hover {
            cursor: pointer;
          }
        `}
      </style>
    </>
  );
};

export default Users;

export async function getStaticProps(context) {
  const response = await fetch('https://randomuser.me/api/?results=200')
  const users = await response.json()

  return {
    props: {users},
  }
}
