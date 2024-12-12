/* eslint-disable no-unsafe-optional-chaining */
const Index = (props) => {
  return <div>Perfil</div>
}

export const getServerSideProps = async ctx => {
  const { uid, slug } = ctx.req.headers?.cookies?.userLogged || {}
  console.log(uid);
  if (!slug) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    redirect: {
      destination: '/perfil/' + slug,
      permanent: false,
    },
    props: {
      id: ctx.query.id,
    }
  }
}

export default Index
