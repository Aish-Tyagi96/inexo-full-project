import DashboardIcon from '@mui/icons-material/Dashboard'
import Inventory2Icon from '@mui/icons-material/Inventory2'
import LogoutIcon from '@mui/icons-material/Logout'
import MenuIcon from '@mui/icons-material/Menu'
import SettingsIcon from '@mui/icons-material/Settings'
import NewspaperIcon from '@mui/icons-material/Newspaper'
import WorkIcon from '@mui/icons-material/Work'
import AppBar from '@mui/material/AppBar'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Stack from '@mui/material/Stack'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import logo from '@/assets/images/brand/inexo-logo.svg'
import { logout, selectCurrentUser } from '@/features/auth/authSlice'

const drawerWidth = 280

const navItems = [
  { label: 'Dashboard', icon: DashboardIcon, path: '/dashboard' },
  { label: 'Catalog', icon: Inventory2Icon, path: '/catalog' },
  { label: 'News & Events', icon: NewspaperIcon, path: '/news-events' },
  { label: 'Job Openings', icon: WorkIcon, path: '/job-openings' },
  { label: 'Settings', icon: SettingsIcon, path: '/settings' },
]

function SidebarContent({ onNavigate }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(selectCurrentUser)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login', { replace: true })
  }

  return (
    <Stack sx={{ height: '100%' }}>
      <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', px: 2.5, py: 2 }}>
        <Box component="img" src={logo} sx={{ height: 52, width: 52 }} />
        <Box>
          <Typography fontWeight={800} variant="h6">Inexo</Typography>
          <Typography color="text.secondary" variant="caption">Admin Portal</Typography>
        </Box>
      </Stack>
      <Divider />
      <List sx={{ flex: 1, px: 1.5, py: 2 }}>
        {navItems.map((item) => {
          const Icon = item.icon

          return (
            <ListItemButton
              component={NavLink}
              key={item.path}
              onClick={onNavigate}
              sx={{ borderRadius: 2, mb: 0.5, '&.active': { bgcolor: 'primary.main', color: 'primary.contrastText', '& .MuiListItemIcon-root': { color: 'primary.contrastText' } } }}
              to={item.path}
            >
              <ListItemIcon><Icon /></ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          )
        })}
      </List>
      <Divider />
      <Stack spacing={1.5} sx={{ p: 2 }}>
        <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
          <Avatar sx={{ bgcolor: 'secondary.main', color: 'primary.dark' }}>{user?.name?.[0] ?? 'A'}</Avatar>
          <Box sx={{ minWidth: 0 }}>
            <Typography noWrap fontWeight={700}>{user?.name ?? 'Admin'}</Typography>
            <Typography color="text.secondary" noWrap variant="body2">{user?.email ?? 'admin@inexo.com'}</Typography>
          </Box>
        </Stack>
        <ListItemButton onClick={handleLogout} sx={{ borderRadius: 2 }}>
          <ListItemIcon><LogoutIcon /></ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </Stack>
    </Stack>
  )
}

export function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar color="inherit" elevation={0} position="fixed" sx={{ borderBottom: '1px solid', borderColor: 'divider', ml: { md: `${drawerWidth}px` }, width: { md: `calc(100% - ${drawerWidth}px)` } }}>
        <Toolbar sx={{ gap: 2 }}>
          <IconButton edge="start" onClick={() => setMobileOpen(true)} sx={{ display: { md: 'none' } }}>
            <MenuIcon />
          </IconButton>
          <Box sx={{ flex: 1 }}>
            <Typography fontWeight={800}>Inexo Operations Console</Typography>
            <Typography color="text.secondary" variant="body2">Manage product catalog workflows and core platform settings.</Typography>
          </Box>
        </Toolbar>
      </AppBar>

      <Box component="nav" sx={{ flexShrink: { md: 0 }, width: { md: drawerWidth } }}>
        <Drawer ModalProps={{ keepMounted: true }} onClose={() => setMobileOpen(false)} open={mobileOpen} sx={{ display: { xs: 'block', md: 'none' }, '& .MuiDrawer-paper': { width: drawerWidth } }} variant="temporary">
          <SidebarContent onNavigate={() => setMobileOpen(false)} />
        </Drawer>
        <Drawer open sx={{ display: { xs: 'none', md: 'block' }, '& .MuiDrawer-paper': { borderRight: '1px solid', borderColor: 'divider', width: drawerWidth } }} variant="permanent">
          <SidebarContent />
        </Drawer>
      </Box>

      <Box component="main" sx={{ flex: 1, minWidth: 0, p: { xs: 2, md: 3 }, pt: { xs: 10, md: 11 } }}>
        <Outlet />
      </Box>
    </Box>
  )
}
