import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { Checkbox, Chip, FormControl, FormControlLabel, FormGroup, FormLabel, InputBase, Radio, RadioGroup } from '@mui/material';

type FormModalProps = {
    open: boolean;
    handleModalClose: () => void;
    handleSubmitModal?: () => void;
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 6,
  borderRadius: '24px',
  color: 'text.primary',
  maxHeight: '90vh',
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
};

const formGroups = [
  {
    label: "Do you have specific cafe to compare?",
    type: "radio",
    options: ["Yes", "No"],
    defaultValue: "no"
  },
  {
    label: "Atmosphere",
    type: "checkbox",
    options: ["Indoor", "Outdoor"],
    defaultValue: ["Indoor"]
  },
  {
    label: "Preferred Menu",
    type: "checkbox",
    options: ["Coffee", "Non-Coffee", "Snack", "Rice"],
    defaultValue: ["Coffee"]
  },
  {
    label: "Facilities",
    type: "checkbox",
    options: ["Wi-Fi", "Electricity", "Mushala", "Parking", "Kids Friendly"],
    defaultValue: ["Wi-Fi"]
  },
  {
    label: "Payment",
    type: "checkbox",
    options: ["Cash", "Non-Cash"],
    defaultValue: ["Cash"]
  }
];

interface FormValues {
  [key: string]: string | string[];
}

const getInitialState = (): FormValues => {
  const initialState: FormValues = {};
  formGroups.forEach(group => {
    initialState[group.label] = group.defaultValue;
  });
  return initialState;
};

export default function FormModal({ open, handleModalClose, handleSubmitModal }: FormModalProps) {
  const [chips, setChips] = React.useState<string[]>([]);
  const [cafeName, setCafeName] = React.useState('');
  const [formValues, setFormValues] = React.useState<FormValues>(getInitialState());

  const handleDelete = (chipToDelete: string) => {
    setChips((prevChips) => prevChips.filter((chip) => chip !== chipToDelete));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && cafeName.trim()) {
      e.preventDefault();
      setChips([...chips, cafeName.trim()]);
      setCafeName('');
    }
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = event.target;
    setFormValues(prev => {
      const oldValues = prev[name] as string[];
      const newValues = checked
        ? [...oldValues, value]
        : oldValues.filter(item => item !== value);
      return { ...prev, [name]: newValues };
    });
  };

  const radioSelection = formValues["Do you have specific cafe to compare?"];

  return (
    <div>
      <Modal open={open} onClose={handleModalClose}>
        <Box sx={{ ...style}}>
          <FormControl component="fieldset">
            <FormLabel component="legend" sx={{ mt: 2, fontWeight: 'bold' }}>{formGroups[0].label}</FormLabel>
            <RadioGroup
              row
              name={formGroups[0].label}
              value={radioSelection}
              onChange={handleRadioChange}
            >
              {formGroups[0].options.map((option) => (
                <FormControlLabel
                  key={option}
                  value={option.toLowerCase()}
                  control={<Radio />}
                  label={option}
                />
              ))}
            </RadioGroup>

            {radioSelection === 'no' && (
              formGroups.slice(1).map((group) => (
                <React.Fragment key={group.label}>
                  <FormLabel component="legend" sx={{ mt: 2, fontWeight: 'bold' }}>{group.label}</FormLabel>
                  <FormGroup row>
                    {group.options.map((option) => (
                      <FormControlLabel
                        key={option}
                        control={
                          <Checkbox
                            name={group.label}
                            value={option}
                            checked={(formValues[group.label] as string[]).includes(option)}
                            onChange={handleCheckboxChange}
                          />
                        }
                        label={option}
                      />
                    ))}
                  </FormGroup>
                </React.Fragment>
              ))
            )}
          </FormControl>
          
          {radioSelection === 'yes' && (
            <FormControl sx={{ mt: 2 }}>
              <FormLabel sx={{ fontWeight: 'bold', mb: '4px' }}>Cafe Names</FormLabel>
              <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1, p: 1, border: '1px solid #ccc', borderRadius: 2 }}>
                {chips.map((chip, index) => (
                  <Chip key={index} label={chip} size="small" onDelete={() => handleDelete(chip)} />
                ))}
                <InputBase
                  placeholder="Type a name and press Enter"
                  value={cafeName}
                  onChange={(e) => setCafeName(e.target.value)}
                  onKeyDown={handleKeyDown}
                  sx={{ flex: 1, minWidth: 120 }}
                />
              </Box>
            </FormControl>
          )}

          <Box sx={{ mt: 3, alignSelf: 'flex-start' }}>
            <Button onClick={handleSubmitModal} variant="contained" sx={{ px: '24px', borderRadius: '24px' }}>Find Cafe</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}