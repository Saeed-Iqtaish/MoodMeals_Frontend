import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import "../../../styles/community/recipe-instructions-list.css";

function RecipeInstructionsList({ instructions = [], onChange }) {
  const safeInstructions = Array.isArray(instructions) && instructions.length > 0 
    ? instructions 
    : [""];

  function handleInstructionChange(index, value) {
    const newInstructions = safeInstructions.map((item, i) => i === index ? value : item);
    if (onChange) {
      onChange(newInstructions);
    }
  }

  function addInstruction() {
    if (onChange) {
      onChange([...safeInstructions, ""]);
    }
  }

  function removeInstruction(index) {
    if (safeInstructions.length > 1 && onChange) {
      onChange(safeInstructions.filter((_, i) => i !== index));
    }
  }

  return (
    <Form.Group className="mb-3">
      <Form.Label>Instructions *</Form.Label>
      {safeInstructions.map((instruction, index) => (
        <Row key={index} className="mb-2">
          <Col>
            <Form.Control
              as="textarea"
              rows={2}
              value={instruction || ""}
              onChange={(e) => handleInstructionChange(index, e.target.value)}
              placeholder={`Step ${index + 1}`}
            />
          </Col>
          <Col xs="auto">
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => removeInstruction(index)}
              disabled={safeInstructions.length === 1}
            >
              <FiTrash2 />
            </Button>
          </Col>
        </Row>
      ))}
      <Button
        variant="outline-primary"
        size="sm"
        onClick={addInstruction}
        className="d-flex align-items-center gap-1"
      >
        <FiPlus /> Add Step
      </Button>
    </Form.Group>
  );
}

export default RecipeInstructionsList;