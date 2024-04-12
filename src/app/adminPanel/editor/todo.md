  data structure of datajson
  [
    {
      id,
      type=image,
      props:{
        width,height,src
      }
    },
    {
      id,
      type=text,
      props:{
        content
      }
    },
    {
      id,
      type:eqn,
      latex
    },
    {
      id, type:video panel,
      videos:[
        {src, start, end, rating},        
      ]
    },
    {
      id, type:Recommended links,
      links:[
        {src, displayText}
      ]
    }
  ]
