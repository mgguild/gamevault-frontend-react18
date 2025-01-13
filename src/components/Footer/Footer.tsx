import React, { ComponentProps } from 'react'
import styled from 'styled-components'
import { Flex, Text } from '@metagg/mgg-uikit'
import { Facebook, Twitter, Mail, Send } from 'react-feather'
import { SiDiscord } from 'react-icons/si'
import useTheme from '../../hooks/useTheme'

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  ${({ theme }) => `
   ${theme.mediaQueries.sm} {
        flex-direction: row;
        justify-content: space-around;
        padding: 10px;
    }
`}
`
const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 5px;
  margin: 10px;
`
const SocMeds = styled.div`
  margin: 10px;
  display: flex;
  flex-direction: column;
  padding: 5px;
  align-items: flex-start;
  ${({ theme }) => `
   ${theme.mediaQueries.sm} {
        align-items: flex-end;
    }
`}
  & > * {
    margin: 10px 0px;
  }
`

const HelperLinks = styled(Flex)`
  flex-direction: column;
  ${({ theme }) => `
   ${theme.mediaQueries.sm} {
        flex-direction: row;
    }
`}
`

const Icons = styled.div`
  display: flex;
  justify-content: space-between;
  min-width: 190px;
`
const CustomLink = styled.a`
  color: ${({ theme }) => theme.colors.textSubtle};
  margin: 5px;
`

const StyledLink = styled(CustomLink)`
  ${({ theme }) => `
${theme.mediaQueries.sm} {
    &:after {
        content: "";
        border-right: 2px solid ${theme.colors.MGG_accent2};
        padding-right: 15px;
      }
      &:before {
        content: "";
        border-left: 2px solid ${theme.colors.MGG_accent2};
        padding-left: 15px;
      }
 }
`}
`
interface SocMedProps{
  link: string;
  icon: React.SVGProps<SVGSVGElement>
}

const SocMed: React.FC<SocMedProps> = ({ link, icon }: any) => (
  <a href={link}>{icon}</a>
)

const Footer: React.FC = () => {
  const { theme } = useTheme()
  const MGGIcon = `${process.env.PUBLIC_URL}/MGG.png`
  return (
    <Container>
      <StyledDiv>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={MGGIcon} alt="mgg-icon" width="60px" style={{ margin: '0px 10px' }} />
          <Text>MetaGaming Guild</Text>
        </div>
        <Text fontSize="1.2em" color={theme.colors.MGG_accent2} marginTop="1rem">
          &quot;A community of tactical gamers&quot;
        </Text>
        <HelperLinks margin="20px 0px" justifyContent="space-evenly">
          <CustomLink target="_blank" rel="noreferrer" href="#">
            Terms and Condition
          </CustomLink>
          <StyledLink target="_blank" rel="noreferrer" href="#">
            Privacy Policy
          </StyledLink>
          <CustomLink target="_blank" rel="noreferrer" href="#">
            Sitemap
          </CustomLink>
        </HelperLinks>
      </StyledDiv>
      <SocMeds>
        <Icons>
          <SocMed icon={<Facebook fill={theme.colors.primary} />} link="https://www.facebook.com/MetaGamingGuild/" />
          <SocMed icon={<Twitter fill={theme.colors.primary} />} link="https://twitter.com/MetaGamingGuild" />
          <SocMed icon={<Send fill={theme.colors.primary} />} link="https://t.me/MetaGamingGuild" />
          {/* <SocMed icon={<SiDiscord fill={theme.colors.primary} />} link="https://discord.gg/5a7Ca7JFD2" /> */}
        </Icons>
        <div style={{ textAlign: 'right' }}>
          <Text>&copy; MetaGaming Guild 2022</Text>
        </div>
      </SocMeds>
    </Container>
  )
}

export default Footer
