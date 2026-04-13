import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  Category,
  Modality,
  Availability,
  NewVagaForm,
} from "../../models/types";
import { message, Steps, Input, InputNumber, Tag, Button, Card } from "antd";
import { useApp } from "../../context/AppContext";
import { Navbar } from "../../components/Navbar";
import styles from "./style.module.css";

const { TextArea } = Input;
const { CheckableTag } = Tag;

const steps = ["Dados básicos", "Detalhes", "Revisão"];

const categories: Category[] = ["Educação", "Saúde", "Social", "Meio Ambiente"];
const modalities: Modality[] = ["Presencial", "Remoto", "Híbrido"];
const availabilities: Availability[] = [
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
  "Domingo",
];

const initialForm: NewVagaForm = {
  title: "Instrutor de Inglês",
  description:
    "Buscamos voluntário para ministrar aulas básicas de inglês para jovens de 14 a 18 anos...",
  slots: 6,
  hoursPerWeek: "2",
  category: "Educação",
  modality: "Presencial",
  availability: ["Quarta", "Sexta"],
};

export default function VagaFormPage() {
  const router = useRouter();
  const { currentUserRole, currentUser } = useApp();
  const [currentStep, setCurrentStep] = useState(0);
  const [form, setForm] = useState<NewVagaForm>(initialForm);

  const toggleAvailability = (a: Availability) => {
    setForm((f) => ({
      ...f,
      availability: f.availability.includes(a)
        ? f.availability.filter((x) => x !== a)
        : [...f.availability, a],
    }));
  };

  const onFinish = async (values: any) => {
    try {
      const ongResponse = await fetch("/api/v1/ong");
      const ongData = await ongResponse.json();
      const currentOng =
        currentUser && currentUser.email
          ? ongData.find((o: any) => o.email === currentUser.email)
          : null;

      if (!currentOng) {
        message.error(
          "Você precisa ter o perfil de ONG salvo no banco de dados primeiro.",
        );
        return;
      }

      const payload = {
        ong_id: currentOng.id,
        titulo: values.title,
        descricao: values.description,
        n_vagas: values.slots,
        categoria: values.category,
        disponibilidade: values.availability,
        carga_horaria: parseInt(values.hoursPerWeek, 10) || 0,
      };

      const response = await fetch("/api/v1/trabalho", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        message.success("Vaga criada com sucesso direto no banco!");
        router.push("/ong");
      } else {
        const err = await response.json();
        message.error(err.error || "Erro ao salvar vaga");
      }
    } catch (e) {
      message.error("Erro de conexão ao salvar trabalho");
    }
  };

  return (
    <div className="page page--cream">
      <Navbar />
      <div className={`container container--narrow ${styles.form_page}`}>
        {/* Steps */}
        <div className={styles.form_steps}>
          <Steps
            current={currentStep}
            items={steps.map((step) => ({ title: step }))}
          />
        </div>

        {/* Card */}
        <Card className={styles.form_card}>
          <h2 className={`heading-serif ${styles.form_heading}`}>
            Detalhes da oportunidade
          </h2>
          <p className={`text-muted ${styles.form_subtitle}`}>
            Passo {currentStep + 1} de {steps.length} — Descreva a vaga para
            atrair voluntários
          </p>

          <div className={styles.form_body}>
            {currentStep === 0 && (
              <>
                <div className={styles.form_group}>
                  <label className={styles.form_label}>
                    Título da vaga{" "}
                    <span className={styles.form_label__required}>*</span>
                  </label>
                  <Input
                    className={styles.form_input}
                    value={form.title}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, title: e.target.value }))
                    }
                  />
                </div>

                <div className={styles.form_group}>
                  <label className={styles.form_label}>
                    Descrição{" "}
                    <span className={styles.form_label__required}>*</span>
                  </label>
                  <TextArea
                    className={styles.form_textarea}
                    value={form.description}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, description: e.target.value }))
                    }
                  />
                </div>
              </>
            )}

            {currentStep === 1 && (
              <div className={styles.details_grid}>
                <div className={styles.form_group}>
                  <label className={styles.form_label}>Nº de Vagas</label>
                  <InputNumber
                    className={styles.form_input}
                    value={form.slots}
                    onChange={(val) =>
                      setForm((f) => ({ ...f, slots: val ?? 0 }))
                    }
                    min={1}
                  />
                </div>
                <div className={styles.form_group}>
                  <label className={styles.form_label}>
                    Carga Horária (por semana)
                  </label>
                  <InputNumber
                    className={styles.form_input}
                    value={Number(form.hoursPerWeek) || 0}
                    onChange={(val) =>
                      setForm((f) => ({ ...f, hoursPerWeek: String(val ?? 0) }))
                    }
                    min={0}
                  />
                </div>
              </div>
            )}

            {/* Category */}
            {currentStep === 0 && (
              <div>
                <div className={`${styles.form_label} mb-12`}>Categoria</div>
                <div className={styles.chip_group}>
                  {categories.map((c) => (
                    <CheckableTag
                      key={c}
                      className={`${styles.chip}${form.category === c ? ` ${styles.chip_active}` : ""}`}
                      checked={form.category === c}
                      onChange={() => setForm((f) => ({ ...f, category: c }))}
                    >
                      {c}
                    </CheckableTag>
                  ))}
                </div>
              </div>
            )}

            {/* Modality */}
            {currentStep === 1 && (
              <div>
                <div className={`${styles.form_label} mb-12`}>Modalidade</div>
                <div className={styles.chip_group}>
                  {modalities.map((m) => (
                    <CheckableTag
                      key={m}
                      className={`${styles.chip}${form.modality === m ? ` ${styles.chip_active}` : ""}`}
                      checked={form.modality === m}
                      onChange={() => setForm((f) => ({ ...f, modality: m }))}
                    >
                      {m}
                    </CheckableTag>
                  ))}
                </div>
              </div>
            )}

            {/* Availability */}
            {currentStep === 1 && (
              <div>
                <div className={`${styles.form_label} mb-12`}>
                  Disponibilidade
                </div>
                <div className={styles.chip_group}>
                  {availabilities.map((a) => (
                    <CheckableTag
                      key={a}
                      className={`${styles.chip}${form.availability.includes(a) ? ` ${styles.chip_active}` : ""}`}
                      checked={form.availability.includes(a)}
                      onChange={() => toggleAvailability(a)}
                    >
                      {a}
                    </CheckableTag>
                  ))}
                </div>
              </div>
            )}

            {/* Review Data */}
            {currentStep === 2 && (
              <div className={styles.review_box}>
                <p>
                  <strong>Título:</strong> {form.title}
                </p>
                <p>
                  <strong>Vagas:</strong> {form.slots} -{" "}
                  <strong>Carga Hóraria:</strong> {form.hoursPerWeek}
                </p>
                <p>
                  <strong>Categoria:</strong> {form.category} |{" "}
                  <strong>Modalidade:</strong> {form.modality}
                </p>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className={styles.form_actions}>
            <Button
              onClick={() => currentStep > 0 && setCurrentStep((s) => s - 1)}
              className={styles.btn_secondary}
              style={{
                visibility: currentStep > 0 ? "visible" : "hidden",
              }}
            >
              ← Voltar Passo
            </Button>
            <Button
              onClick={() =>
                currentStep < steps.length - 1
                  ? setCurrentStep((s) => s + 1)
                  : onFinish(form)
              }
              className={styles.btn_primary}
            >
              {currentStep < steps.length - 1 ? "Próximo →" : "Publicar Vaga ✓"}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
