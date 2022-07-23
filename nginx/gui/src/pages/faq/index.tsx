import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import AOS from 'aos';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Grid } from '../../components';
import { Question, State } from '../../api/types';
import { getQuestions, getStates } from '../../api';
import './styles.scss';
import { datAosOnce, fadeDown, fadeRight, fadeUp, fadeZoomOut } from '../../utils/animationsName';

const Faq: React.FC<RouteComponentProps> = () => {

  const [states, setStates] = React.useState<State[]>([]);
  const [questions, setQuestions] = React.useState<Question[]>([]);
  const [expanded, setExpanded] = React.useState<string | false>('1');

  const handleChange = (id: string) => {
    setExpanded(id)
  }

  React.useEffect(() => {
    AOS.init({
      duration: 2000
    })
    getQuestions()
      .then((data: Question[]) => {
        setQuestions(data);
      })

    getStates()
      .then((data: State[]) => {
        setStates(data);
      })
  }, []);



  const faqComponent = (
    <div className='lg-rules faq-header-main-container'>
      <div className="faq-header-conainer-main">
        <div className="contact-us-container-absolute-child"></div>
      </div>

      <div className='lg-rules--header'>FAQ</div>
      <div style={{ marginTop: '40px' }}>
        {questions?.map((question: Question) => (
          <Accordion defaultExpanded={true} key={question.id}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='rules-content'
              id='rules-header'
              className="faq-accordian-header"
            >
              <div className="faq-collapse-header-heading">{question.question}</div>
            </AccordionSummary>
            <AccordionDetails>
              <div data-aos-once={datAosOnce} data-aos={fadeRight} className="faq-collapse-header-heading-answer">{question.answer}</div>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );

  return (
    <div className="faq-main-container">
      <Grid
        items={[
          {
            id: 'lg-rules',
            cols: { xs: 12, sm: 8, md: 6, lg: 10 },
            content: faqComponent,
            rows: 1,
          },
        ]}
      />
    </div>
  );
};

export default withRouter(Faq);
