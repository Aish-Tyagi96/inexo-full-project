import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export function PageHeader({ eyebrow, title, description, action }) {
  return (
    <Box sx={{ display: 'flex', alignItems: { xs: 'flex-start', md: 'center' }, justifyContent: 'space-between', gap: 2, mb: 3, flexDirection: { xs: 'column', md: 'row' } }}>
      <Box>
        {eyebrow ? (
          <Typography color="primary" fontWeight={700} letterSpacing={1.4} sx={{ textTransform: 'uppercase' }} variant="caption">
            {eyebrow}
          </Typography>
        ) : null}
        <Typography color="text.primary" variant="h4">
          {title}
        </Typography>
        {description ? (
          <Typography color="text.secondary" sx={{ mt: 0.75, maxWidth: 760 }} variant="body1">
            {description}
          </Typography>
        ) : null}
      </Box>
      {action}
    </Box>
  )
}
